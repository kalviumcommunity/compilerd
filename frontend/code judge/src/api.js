import axios from "axios";

const API_URL = "http://localhost:3000/api/execute";

const executeCode = async (language, sourceCode) => {
  if (language === "javascript") {
    language = "nodejs";
  }

  try {
    const payload = { language: language, script: sourceCode };

    const { data: resultData } = await axios.post(API_URL, payload);
    console.log("Response from API:", resultData);

    if (resultData.error > 0) {
      const compile_message = resultData.compile_message;
      const output = resultData.output;

      if (compile_message !== "")
        return { result: resultData, displayValue: resultData.compile_message };
      else if (output !== "")
        return { result: resultData, displayValue: resultData.output };
    }

    return { result: resultData, displayValue: resultData.output };
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Server error");
  }
};

export { executeCode };
