const { validationResult } = require("express-validator");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    // this.statusCode = statusCode;
  }
}

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.statusCode = 400;
    const err = new ValidationError(errors.array()[0].msg);
    throw err;
  }
  return next();
};

module.exports = { handleValidationErrors };
