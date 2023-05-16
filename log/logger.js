const config = require("config");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint } = format;
const loggerConfig = config.get("logger");
const { Level } = loggerConfig;

const logger = createLogger({
  format: combine(
    timestamp(),
    loggerConfig.prettyPrint === "true" ? prettyPrint() : prettyPrint()
  ),

  transports: [],
});
// logger.add or remove transport from logger from documentation
switch (loggerConfig.appDestination) {
  case "FILE":
    logger.add(
      new transports.File({
        filename: loggerConfig.FilePath,
        level: Level,
      })
    );
    break;
  default:
    logger.add(new transports.Console());
    break;
}

module.exports = logger;
