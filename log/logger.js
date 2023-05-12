const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint, json } = format;

const transportOption = process.env.TRANSPORT;
const consoleTransportEnabled = process.env.CONSOLE_TRANSPORT_ENABLED;

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp(),
    process.env.PRETTY_PRINT === "enabled" ? prettyPrint() : json()
  ),
  transports: [
    consoleTransportEnabled === "true" ? new transports.Console() : null,
    transportOption === "file"
      ? new transports.File({ filename: "combined.log", level: "info" })
      : null,
    transportOption === "file"
      ? new transports.File({ filename: "errors.log", level: "error" })
      : null,
  ],
});

module.exports = logger;
