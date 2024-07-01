import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";
import Assistant from "./components/Assistant";
import TextExtractor from "./components/TextExtractor";
function App() {
  return (
    <>
      <Header />
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
      <Assistant />
      <TextExtractor />
    </>
  );
}

export default App;
