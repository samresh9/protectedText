module.exports = {
  logger: {
    filePath: "./src/log/combined.log",
    level: "info",
    prettyPrint: true,
    destination: "console",
  },
  db: {
    url: process.env.MONGO_CONNECTION_URI,
  },
};
