const { respond, respondWithException } = require("../loader").helpers;
const { codeTransformer } = require("../transformers/code.transformer");
const codeService = require("../services/code.service");
const { isValidForExecute } = require("../validators/code.validator");

const execute = async (req, res) => {
  try {
    let constraints = {
      TLE: 0,
      MLE: 0,
    };
    let responseBody;

    const validatedData = await isValidForExecute(req.body);
    if (validatedData.constraints) constraints = validatedData.constraints;

    if (constraints.TLE > 0) {
      
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Time Limit Exceeded")), constraints.TLE));

      const executionPromise = async () => {
        return await codeService.execute(validatedData, res);
      };
      
      try {
        responseBody = await Promise.race([executionPromise(), timeoutPromise]);
      } catch (error) {
        if (error.message === "Time Limit Exceeded") {
          responseBody = {
            statusCode: 200,
            error: 1,
            output: "",
            executeTime: null,
            memory: null,
            cpuTime: null,
            outputFiles: [],
            compileMessage: "",
            errorMessage: "Time Limit Exceeded",
          };
        } else {
          return respondWithException(res, error);
        }
      }

      return respond(res, responseBody.statusCode, codeTransformer.transform(responseBody));
    } 
    
    else {
      const responseBody = await codeService.execute(validatedData, res);
      return respond(res, responseBody.statusCode, codeTransformer.transform(responseBody));
    }
  } catch (error) {
    respondWithException(res, error);
  }
};

module.exports = {
  execute,
};
