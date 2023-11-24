module.exports = {
  logger: {
    filePath: "./log/combined.log",
    level: "info",
    prettyPrint: true,
    destination: "console",
  },
  db: {
    url: process.env.MONGO_CONNECTION_URI,
  },
  corsOrigin: {
    url: process.env.ENABLED_ORIGIN,
  },
  errorsCodes: {
    validationError: "VALIDATION_ERROR",
    notFound: "NOT_FOUND",
    unauthorized: "UNAUTHORIZED_ERROR",
  },
};
