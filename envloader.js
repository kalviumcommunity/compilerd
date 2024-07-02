const fs = require('fs')

const initializeENV = () => {
    const path = '/env/.env'
    if (fs.existsSync(path)) { require('dotenv').config({ path }) } else { require('dotenv').config() }
}

module.exports = initializeENV
