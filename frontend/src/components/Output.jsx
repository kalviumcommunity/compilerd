import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(""); // Store output as a string
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode);
      if (result.status_code === 200) {
        setOutput(result.output.trim()); // Trim whitespace from output
        setIsError(false);
      } else {
        setIsError(true);
        toast({
          title: "Execution Error",
          description: result.errorMessage || "Failed to run code",
          status: "error",
          duration: 6000,
        });
      }
    } catch (error) {
      console.error("Error executing code:", error);
      setIsError(true);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        <Text>{output || 'Click "Run Code" to see the output here'}</Text>
      </Box>
    </Box>
  );
};
export default Output;
