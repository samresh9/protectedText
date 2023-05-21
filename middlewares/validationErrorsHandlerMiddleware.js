const { validationResult } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array()[0].statusCode = 400;
    const err = {
      message: errors.array()[0].msg,
      statusCode: errors.array()[0].statusCode,
    };
    throw err;
  }
  next();
};

module.exports = { handleValidationErrors };
