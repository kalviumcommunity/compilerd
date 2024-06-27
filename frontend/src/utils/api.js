import axios from "axios";

const API_URL = "http://localhost:3000/api/execute";

const compileLangs = ["c", "cpp", "java", "go"];

const executeCode = async (data) => {
  if (data.language === "javascript") {
    data.language = "nodejs";
  }
  try {
    const { data: resData } = await axios.post(API_URL, data);

    if (resData.error > 0) {
      const compile_message = resData.compile_message;
      const output = resData.output;

      if (compile_message !== "") return { result: resData, showValue: resData.compile_message };
      else if (output !== "" ) return { result: resData, showValue: resData.output };
    }

    return { result: resData, showValue: resData.output };
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Server error");
  }
};

export { executeCode };
