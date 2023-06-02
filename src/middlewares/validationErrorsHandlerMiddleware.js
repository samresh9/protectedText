const { validationResult } = require("express-validator");

class ValidationError extends Error {
  constructor(message, errors) {
    super();
    // this.message = message;
    this.message = message;
    this.errors = errors;
    this.code = "VALIDATION_ERROR";
  }
}

const schemaValidator = (validations) => {
  return async (req, res, next) => {
    // await Promise.all(validations.map((validation) => validation.run(req)));
    const promises = [];
    for (let i = 0; i < validations.length; i += 1) {
      promises.push(validations[i].run(req));
    }
    await Promise.all(promises);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.statusCode = 400;
      const errorMessage = errors.array().map((error) => error.msg);
      const err = new ValidationError(`${errorMessage}`, errors.array());
      return next(err);
    }
    return next();
  };
};

module.exports = { schemaValidator };
