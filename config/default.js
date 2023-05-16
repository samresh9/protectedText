module.exports = {
  logger: {
    filePath: "./log/combined.log",
    level: "info",
    prettyPrint: true,
    destination: "console",
  },
  encryptionKey: {
    secretKey: process.env.SECRET_KEY,
  },
};
