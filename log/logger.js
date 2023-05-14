const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp(),
    process.env.PRETTY_PRINT === "true" ? prettyPrint() : prettyPrint()
  ),
  transports: [],
});
// logger.add or remove transport from logger from documentation
if (process.env.LOG_TO_FILE === "true") {
  logger.add(
    new transports.File({ filename: process.env.LOG_FILE_PATH, level: "info" })
  );
} else {
  logger.add(new transports.Console());
}

module.exports = logger;
