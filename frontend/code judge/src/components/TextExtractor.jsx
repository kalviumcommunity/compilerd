import React, { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Text,
  VStack,
  Spinner,
  useToast,
  Icon,
  HStack,
  Collapse,
} from "@chakra-ui/react";
import { FaUpload, FaCopy, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TextExtractor = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const apiKey = "Your Api Gemini Key";

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
      console.log("Image selected:", acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const extractText = async () => {
    if (!image) {
      toast({
        title: "No image selected.",
        description: "Please select an image to extract text.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      console.log("Initializing GoogleGenerativeAI with API key...");
      const genAI = new GoogleGenerativeAI(apiKey);

      const fileToGenerativePart = (file, mimeType) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              inlineData: {
                data: reader.result.split(",")[1],
                mimeType,
              },
            });
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };

      console.log("Getting generative model...");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "extract the data from image";
      const imagePart = await fileToGenerativePart(image, image.type);

      console.log("Sending request to generate content...");
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      console.log("Response received:", response);

      const text = await response.text();
      console.log("Extracted text:", text);

      setExtractedText(text);
    } catch (error) {
      console.error("Error extracting text:", error);
      toast({
        title: "Error extracting text.",
        description: "An error occurred while extracting text from the image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <Box position="fixed" bottom="20px" left="20px" zIndex="1000">
      <Button
        onClick={toggleCollapse}
        leftIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        colorScheme="teal"
        mb={4}
      >
        {isOpen ? "Hide" : "Show Text Extractor"}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p={4}
          maxW="400px"
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          bg="#0d1117"
          color="white"
          boxShadow="md"
        >
          <VStack spacing={4}>
            <Box
              {...getRootProps()}
              p={4}
              borderWidth={2}
              borderRadius="md"
              borderColor={isDragActive ? "teal.500" : "gray.300"}
              borderStyle="dashed"
              textAlign="center"
              cursor="pointer"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Text>Drop the files here...</Text>
              ) : (
                <Text>
                  Drag 'n' drop an image here
                  <Icon as={FaUpload} w={6} h={6} ml={2} />
                </Text>
              )}
            </Box>
            {image && (
              <Text mt={2} fontWeight="bold">
                Selected file: {image.name}
              </Text>
            )}
            <Button
              onClick={extractText}
              isLoading={loading}
              colorScheme="teal"
            >
              {loading ? <Spinner size="sm" /> : "Extract Text"}
            </Button>
            {extractedText && (
              <Box
                p={4}
                mt={4}
                borderWidth={1}
                borderRadius="lg"
                w="100%"
                maxW="400px"
                maxH="200px"
                overflowY="auto"
                bg="#0d1117"
                color="white"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "gray.300",
                    borderRadius: "24px",
                  },
                }}
              >
                <HStack justifyContent="space-between" mb={2}>
                  <Text fontWeight="bold">Extracted Text:</Text>
                  <CopyToClipboard text={extractedText}>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      leftIcon={<FaCopy />}
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </HStack>
                <Box p={2} borderRadius="md">
                  <Text>{extractedText}</Text>
                </Box>
              </Box>
            )}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default TextExtractor;
