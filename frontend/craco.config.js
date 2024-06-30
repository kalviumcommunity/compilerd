const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@backend': path.resolve(__dirname, '../'),
    },
  },
};
