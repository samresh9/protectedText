const { validationResult } = require("express-validator");

class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
    // this.statusCode = statusCode;
  }
}

const handleValidationErrors = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.statusCode = 400;
      const errorMessages = errors.array().map((error) => error.msg);
      const errorMessage = errorMessages.join(" & ");
      const err = new ValidationError(errorMessage);
      next(err);
    }
    return next();
  };
};

module.exports = { handleValidationErrors };
