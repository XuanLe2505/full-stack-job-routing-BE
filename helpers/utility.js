const crypto = require("crypto");

const utilHelper = {};

utilHelper.sendResponse = (data, statusCode, message, res, next) => {
  const result = { data, message };
  return res.status(statusCode).send(result);
};

utilHelper.generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};
utilHelper.throwException = (message, status) => {
  const err = new Error(message);
  err.statusCode = status;
  throw err;
};

module.exports = utilHelper;
