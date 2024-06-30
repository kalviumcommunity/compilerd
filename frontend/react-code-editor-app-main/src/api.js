// import axios from "axios";
// import { LANGUAGE_VERSIONS } from "./constants";

// const API_URL = "http://localhost:3000/api/execute";
// // export const executeCode = async (language, sourceCode) => {
// //   const response = await API.post("/execute", {
// //     language: language,
// //     version: LANGUAGE_VERSIONS[language],
// //     files: [
// //       {
// //         content: sourceCode,
// //       },
// //     ],
// //   });
// //   return response.data;
// // };

// const executeCode = async (language, sourceCode) => {
//   // console.log(data);
//   if (language === "javascript") {
//     language = "nodejs";
//   }
//   try {
//     payload = { language: language, script: sourceCode };
//     const { data: resData } = await axios.post(API_URL, payload);

//     if (resData.error > 0) {
//       const compile_message = resData.compile_message;
//       const output = resData.output;

//       if (compile_message !== "")
//         return { result: resData, showValue: resData.compile_message };
//       else if (output !== "")
//         return { result: resData, showValue: resData.output };
//     }

//     return { result: resData, showValue: resData.output };
//   } catch (error) {
//     throw new Error(error.response ? error.response.data : "Server error");
//   }
// };

// export { executeCode };

import axios from "axios";

const API_URL = "http://localhost:3000/api/execute";

const executeCode = async (language, sourceCode) => {
  if (language === "javascript") {
    language = "nodejs";
  }
  try {
    const payload = { language: language, script: sourceCode };

    const { data: resData } = await axios.post(API_URL, payload);
    console.log("Response from API:", resData);

    if (resData.error > 0) {
      const compile_message = resData.compile_message;
      const output = resData.output;

      if (compile_message !== "")
        return { result: resData, showValue: resData.compile_message };
      else if (output !== "")
        return { result: resData, showValue: resData.output };
    }

    return { result: resData, showValue: resData.output };
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Server error");
  }
};

export { executeCode };
