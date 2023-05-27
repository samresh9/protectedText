const logger = require("../log/logger").child({ filename: __filename });

const unhandledRejectionsHandler = (err) => {
  logger.error(err.message);
  process.exit(1);
};

const uncaughtExceptionHandler = (err) => {
  logger.error(err.message);
  logger.error("Uncaught exception shutting down");
  process.exit(1);
};
module.exports = { unhandledRejectionsHandler, uncaughtExceptionHandler };
