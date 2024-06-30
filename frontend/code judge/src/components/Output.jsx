import { useState } from "react";
import { Box, Button, Text, Textarea, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { result, displayValue } = await executeCode(language, sourceCode);
      setOutput(displayValue);
      setIsError(!!result.stderr);
    } catch (error) {
      console.log(error);
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

  const handleOutputChange = (e) => {
    setOutput(e.target.value);
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
        whiteSpace="pre"
        fontFamily="monospace"
      >
        <Textarea
          value={output}
          onChange={handleOutputChange}
          placeholder='Click "Run Code" to see the output here'
          height="100%"
          border="none"
          resize="none"
          _focus={{ outline: "none" }}
          _hover={{ border: "none" }}
        />
      </Box>
    </Box>
  );
};

export default Output;
