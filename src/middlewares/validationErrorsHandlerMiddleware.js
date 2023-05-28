const { validationResult } = require("express-validator");

class ValidationError extends Error {
  constructor(errors) {
    super();
    this.message = errors.map((error) => error.msg);
    this.name = "ValidationError";
    this.errors = errors;
    // this.statusCode = statusCode;
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
      const err = new ValidationError(errors.array());
      return next(err);
    }
    return next();
  };
};

module.exports = { schemaValidator };
