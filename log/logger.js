/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, label, prettyPrint, json } = format;
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log", level: "info" }),
    new transports.File({ filename: "errors.log", level: "error" }),
  ],
});

module.exports = logger;
