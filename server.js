require('./envloader')();
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const baseRouter = require('./router.js');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const { respond, l } = require('./loader.js').helpers;

require('./loader.js').loadDependency(app);

const OpenAI = require('openai');

// Instantiate the OpenAI client
const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL,  // Fetch base URL from environment variable
  apiKey: process.env.OPENAI_API_KEY,    // Fetch API key from environment variable
  organization: process.env.OPENAI_ORG_ID ?? null,  // Fetch Organization ID from environment variable if available
  // Other options
});

console.log('OpenAI client initialized');

console.log('OPENAI_BASE_URL:', process.env.OPENAI_BASE_URL);
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
console.log('OPENAI_ORG_ID:', process.env.OPENAI_ORG_ID);

/* Middlewares */
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return respond(res, 400, { message: 'Invalid JSON found' });
  }
  next();
});
// Log all api requests
app.use(
  morgan(
    'REQUEST [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
    {
      immediate: true,
      skip: function (req) { return (req.path === '/api/'); },
    },
  ),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '2mb',
    parameterLimit: 1000000,
  }),
);

app.use(compression());
app.use(helmet());
app.use(cors());

app.use('/api/', baseRouter);

// Serve static files from the React app in the public directory
app.use(express.static(path.join(__dirname, 'Frontend/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/public', 'index.html'));
});

app.listen(PORT, () => {
  l.info(`Server started at port: ${PORT}`);
});
