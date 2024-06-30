import React from 'react';

const Output = ({
  outputData,
  output,
  theme,
  compile_message,
  execute_time,
  memory,
  cpu_time,
}) => {

  return (
    <div className={`p-4 h-[42vh] overflow-x-auto border rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}>
      {output===""? (
        <div className="text-red-500">
          <pre className='text-red-500'>{compile_message}</pre>
        </div>
      ) : (
        <div>
          {output && <pre>{output}</pre>}
          {outputData.message == null && execute_time !== null && memory !== null && cpu_time !== null && (
            <div className="mt-4">
              <p><strong>Execution Time:</strong> {execute_time} ms</p>
              <p><strong>Memory Usage:</strong> {memory} KB</p>
              <p><strong>CPU Time:</strong> {cpu_time} ms</p>
            </div>
          )}
          {outputData.message && (
            <div>
              <p>{outputData.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Output;

