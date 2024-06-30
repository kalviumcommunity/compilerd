import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  VStack,
  Heading,
  ChakraProvider,
  IconButton,
} from "@chakra-ui/react";
import { MdMenu, MdClose } from "react-icons/md";

const Assistant = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const apiKey = "your api key";
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage = { type: "user", text: prompt };
    setChat([...chat, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const botMessage = { type: "bot", text };
      setChat([...chat, userMessage, botMessage]);
      setResponse(text);

      console.log("Bot's Response:", text);
    } catch (error) {
      console.error("Error generating content:", error);
      const errorMessage = {
        type: "bot",
        text: "Sorry, something went wrong.",
      };
      setChat([...chat, userMessage, errorMessage]);
    }

    setPrompt("");
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChakraProvider>
      <Box
        position="fixed"
        bottom="10px"
        right="10px"
        width={isOpen ? "300px" : "50px"}
        height={isOpen ? "400px" : "50px"}
        padding="10px"
        boxShadow="0 4px 8px rgba(0,0,0,0.2)"
        backgroundColor="black"
        borderRadius="8px"
        fontFamily="Arial, sans-serif"
        transition="all 0.3s ease"
      >
        {isOpen ? (
          <VStack spacing="4" height="100%">
            <Heading as="h2" size="md">
              Chat with the Assistant
            </Heading>
            <Box
              maxHeight="300px"
              overflowY="auto"
              marginBottom="10px"
              width="100%"
            >
              {chat.map((entry, index) => (
                <Box
                  key={index}
                  textAlign={entry.type === "user" ? "right" : "left"}
                  backgroundColor={
                    entry.type === "user" ? "#0d1117" : "#E2E2E2"
                  }
                  color={entry.type === "user" ? "white" : "black"}
                  padding="5px 10px"
                  borderRadius="10px"
                  margin="5px 0"
                  borderWidth="1px"
                  borderStyle="solid"
                >
                  <Text>{entry.text}</Text>
                </Box>
              ))}
            </Box>
            <Flex width="100%">
              <Input
                flex="1"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your prompt..."
              />
              <Button
                marginLeft="2"
                backgroundColor="#007BFF"
                color="white"
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Flex>
          </VStack>
        ) : (
          <Flex justify="flex-end" align="center" height="100%">
            <IconButton
              aria-label="Open chat"
              icon={<MdMenu />}
              onClick={toggleChatBox}
              backgroundColor="#007BFF"
              color="white"
              borderRadius="full"
              size="sm"
            />
          </Flex>
        )}
        {/* Close button */}
        {isOpen && (
          <IconButton
            aria-label="Close chat"
            icon={<MdClose />}
            onClick={toggleChatBox}
            position="absolute"
            top="5px"
            right="5px"
            backgroundColor="transparent"
            color="white"
            borderRadius="full"
            size="sm"
            zIndex="1"
          />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Assistant;
