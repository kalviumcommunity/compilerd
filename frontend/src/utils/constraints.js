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
  const { execute_time } = data;
  const { MLE } = constraints;
  
  const res = checkErrors(data);
  return res;
};

export { checkConstraints };
