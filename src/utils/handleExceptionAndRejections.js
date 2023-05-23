const logger = require("../log/logger").child({ filename: __filename });

const unhandledRejections = () => {
  process.on("unhandledRejection", (err) => {
    logger.error(err.name, err.message);
    process.exit(1);
  });
};
const uncaughtException = () => {
  process.on("uncaughtException", (err) => {
    logger.error(err.name, err.message);
    logger.info("Uncaught exception shutting down");
    process.exit(1);
  });
};
module.exports = { unhandledRejections, uncaughtException };
