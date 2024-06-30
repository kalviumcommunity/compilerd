import axios from "axios";

const API_URL = "http://localhost:3000/api/execute";

const compileLangs = ["c", "cpp", "java", "go", "rust", "php", "perl" ];

const runCode = async (data) => {
  if (data.language === "javascript") {
    data.language = "nodejs";
  }
  try {
    const { data: resData } = await axios.post(API_URL, data);

    if (compileLangs.includes(data.language) && resData.error > 0) {
      return { result: resData, dispValue: resData.compile_message };
    }

    return { result: resData, dispValue: resData.output };
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Server error");
  }
};

export { runCode };