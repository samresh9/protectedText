const config = require("config");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint } = format;
const loggerConfig = config.get("logger");
const { level } = loggerConfig;

const logger = createLogger({
  format: combine(
    timestamp(),
    loggerConfig.prettyPrint === "true" ? prettyPrint() : prettyPrint()
  ),

  transports: [],
});
// logger.add or remove transport from logger from documentation
switch (loggerConfig.destination) {
  case "FILE":
    logger.add(
      new transports.File({
        filename: loggerConfig.filePath,
        level,
      })
    );
    break;
  default:
    logger.add(new transports.Console());
    break;
}
const winstonLogger = logger.child({ filename: __filename });
module.exports = winstonLogger;
