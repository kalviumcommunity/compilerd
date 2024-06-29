const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
const loadEnvVariables = () => {
    const envPath = path.resolve(__dirname, '.env');
    dotenv.config({ path: envPath });
};

module.exports = { loadEnvVariables };
