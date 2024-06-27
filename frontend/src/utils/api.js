import axios from "axios";

const API_URL = "http://localhost:3000/api/execute";

const compileLangs = ["c", "cpp", "java", "go"];

const executeCode = async (data) => {
  if (data.language === "javascript") {
    data.language = "nodejs";
  }
  try {
    const { data: resData } = await axios.post(API_URL, data);

    if (compileLangs.includes(data.language) && resData.error > 0) {
      return { result: resData, showValue: resData.compile_message };
    }

    return { result: resData, showValue: resData.output };
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Server error");
  }
};

export { executeCode };
