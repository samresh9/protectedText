module.exports = {
  logger: {
    level: "error",
    filePath: "./log/combined2.log",
    destination: "FILE",
  },
  dbConnection: process.env.MONGO_CONNECTION_URI_PROD,
};
