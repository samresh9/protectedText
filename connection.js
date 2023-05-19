const mongoose = require("mongoose");
const config = require("config");
const logger = require("./log/logger").child({ filename: __filename });

const connectionUrl = config.get("dbConnection");
mongoose.set("strictQuery", true);
function connectMongoDb() {
  mongoose
    .connect(connectionUrl)
    .then(() => {
      logger.info("Databsase Connected");
    })
    .catch((error) => {
      logger.error(`Database Error occured ${error}`);
    });
}

module.exports = {
  connectMongoDb,
};
