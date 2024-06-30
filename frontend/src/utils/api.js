import axios from "axios";
import { checkConstraints } from "./constraints";

const API_URL = "http://localhost:3000/api/execute";

const executeCode = async (data) => {
  if (data.language === "javascript") {
    data.language = "nodejs";
  }

  data.language = data.language.toUpperCase();

  try {
    const { data: resData } = await axios.post(API_URL, { script: data.script, language: data.language, constraints: data.constraints });
    const result = checkConstraints(resData, data.constraints);

    return result;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Server error");
  }
};

export { executeCode };
