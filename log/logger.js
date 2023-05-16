const config = require("config");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint } = format;
const logLevel = config.get("logger.logLevel");
const logger = createLogger({
  format: combine(
    timestamp(),
    config.get("logger.prettyPrint") === "true" ? prettyPrint() : prettyPrint()
  ),

  transports: [],
});
// logger.add or remove transport from logger from documentation
switch (config.get("logger.appLogDestination")) {
  case "FILE":
    logger.add(
      new transports.File({
        filename: config.get("logger.logFilePath"),
        level: logLevel,
      })
    );
    break;
  default:
    logger.add(new transports.Console());
    break;
}

module.exports = logger;
