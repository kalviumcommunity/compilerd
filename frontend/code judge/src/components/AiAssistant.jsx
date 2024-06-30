import React, { useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

const AiAssistant = () => {
  const [messages, setMessages] = useState([]);

  const handleAskQuestion = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer AIzaSyAEzFqg2PDBVbgzMay8XyX3cXUkmrxZVpg`,
        },
        body: JSON.stringify({
          question: "How can I assist you today?",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from AI service");
      }

      const data = await response.json();

      const newMessage = {
        text: data.answer,
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  return (
    <Box p={4} bg="gray.200" borderRadius="md">
      <VStack align="flex-end" spacing={2}>
        {messages.map((message, index) => (
          <Box
            key={index}
            bg={message.isUser ? "blue.500" : "green.500"}
            color="white"
            p={2}
            borderRadius="md"
            alignSelf={message.isUser ? "flex-start" : "flex-end"}
            maxWidth="70%"
          >
            <Text>{message.text}</Text>
          </Box>
        ))}
        <Button colorScheme="blue" size="sm" onClick={handleAskQuestion}>
          Ask AI Assistant
        </Button>
      </VStack>
    </Box>
  );
};

export default AiAssistant;
