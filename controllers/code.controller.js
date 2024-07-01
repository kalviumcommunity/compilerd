const { respond, respondWithException } = require("../loader").helpers;
const { codeTransformer } = require("../transformers/code.transformer");
const codeService = require("../services/code.service");
const { isValidForExecute } = require("../validators/code.validator");

const createConstraints = (validatedData) => {
  return validatedData.constraints || { TLE: 0, MLE: 0 };
};

const createTimeoutPromise = (TLE) => {
  return TLE > 0 ? new Promise((_, reject) => setTimeout(() => reject(new Error("Time Limit Exceeded")), TLE)) : null;
};

const handleExecution = async (validatedData, res, constraints) => {
  try {
    const promises = [codeService.execute(validatedData, res), createTimeoutPromise(constraints.TLE)].filter(Boolean);

    return await Promise.race(promises);
  } catch (error) {
    if (error.message === "Time Limit Exceeded") {
      return {
        statusCode: 200,
        error: 1,
        output: "",
        executeTime: null,
        memory: null,
        cpuTime: null,
        outputFiles: [],
        compileMessage: "",
        errorMessage: error.message,
      };
    } else {
      throw error;
    }
  }
};

const execute = async (req, res) => {
  try {
    const validatedData = await isValidForExecute(req.body);
    const constraints = createConstraints(validatedData);

    let responseBody = await handleExecution(validatedData, res, constraints);

    return respond(res, responseBody.statusCode, codeTransformer.transform(responseBody));
  } catch (error) {
    respondWithException(res, error);
  }
};

module.exports = { execute };
