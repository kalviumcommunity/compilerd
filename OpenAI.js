const OpenAI = require('openai');

// Instantiate the OpenAI client with environment variables
const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL,  // Fetch base URL from environment variable
  apiKey: process.env.OPENAI_API_KEY,    // Fetch API key from environment variable
  organization: process.env.OPENAI_ORG_ID ?? null,  // Fetch Organization ID from environment variable if available
  // Other options
});
