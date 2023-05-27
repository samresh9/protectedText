const handleNotFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.method} ${req.originalUrl}`);
  res.statusCode = 404;
  next(error);
};

const handle500Error = (error, req, res, _next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    statusCode,
    stackTrace:
      process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

module.exports = {
  handle500Error,
  handleNotFound,
};
