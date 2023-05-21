const handleNotFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const handle500Error = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    statusCode,
    stackTrace:
      process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
  next();
};

module.exports = {
  handle500Error,
  handleNotFound,
};
