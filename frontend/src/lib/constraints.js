const checkErrors = (data) => {
  if (data.error > 0) {
    const compile_message = data.compile_message;
    const errorMessage = data.errorMessage;

    if (compile_message !== "") return { result: data, showValue: data.compile_message };
    else if (errorMessage !== "") return { result: data, showValue: data.errorMessage };
  }
  return { result: data, showValue: data.output };
};

const checkConstraints = (data, constraints) => {
  //round to 4 deicmal points
  data.memory = Math.round(data.memory);

  const res = checkErrors(data);
  return res;
};

export { checkConstraints };
