module.exports = {
  logger: {
    destination: "FILE",
  },
  dbConnection: process.env.MONGO_CONNECTION_URI_DEV,
};
