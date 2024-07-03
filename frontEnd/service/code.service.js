const fs = require('fs');
const path = require('path');

const saveCodeInput = async (codeData) => {
    const filePath = path.join(__dirname, '..', 'data', 'codeInputs.json');
    
    let data = [];
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    data.push(codeData);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = {
    saveCodeInput,
};
