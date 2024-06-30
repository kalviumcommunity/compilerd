import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post("/execute", {
      language: language,
      script: sourceCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw error; // Rethrow or handle the error as needed
  }
};