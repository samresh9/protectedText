require("dotenv").config();
const { connectMongoDb } = require("./connection");
const app = require("./index");

const PORT = process.env.PORT || 7000;
const logger = require("./log/logger").child({ filename: __filename });

const main = async () => {
  try {
    await connectMongoDb();
    app.listen(PORT, () => {
      logger.info(`Server started at port ${PORT}`);
    });
  } catch (err) {
    logger.error("Database Connection Error:", err);
  }
};

(async () => {
  await main();
})();
