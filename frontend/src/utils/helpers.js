import { BASE_URL } from "../constants/BASE_URL";

function transformScript(script) {
  const lines = script.split("\n");
  const transformedScript = lines
    .map((line, index) => (index === lines.length - 1 ? line : `${line}\n`))
    .join("");

  return transformedScript;
}

function transformedInput(input) {
  return input.split(",").join(" ");
}

// Function to compile the given script
export const compileCode = async (language, code, input = undefined) => {
  const script = transformScript(code);
  const stdin = input ? transformedInput(input) : undefined;

  let bodyData = {
    language,
    script,
  };

  // Conditionally add stdin if it's not undefined
  if (stdin !== undefined) {
    bodyData.stdin = stdin;
  }

  if (language === "promptv1" || language === "promptv2") {
    bodyData = {
      language,
      question: script,
      userAnswer: stdin,
    };
  }

  try {
    console.log(bodyData);
    const res = await fetch(`${BASE_URL}/execute/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const result = await res.json();
    console.log(result);

    return result.output || result.compile_message || result.message;
  } catch (e) {
    console.error("Compilation error:", e);
    throw new Error("Failed to compile code");
  }
};
