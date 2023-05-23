const mongoose = require("mongoose");
const config = require("config");
const logger = require("./log/logger").child({ filename: __filename });

const dbConnection = config.get("db");
mongoose.set("strictQuery", true);
async function connectMongoDb() {
  try {
    await mongoose.connect(dbConnection.url);
    logger.info("Databsase Connected");
  } catch (error) {
    logger.error("databse error occured", error);
    throw new Error(error.message);
  }
}

module.exports = {
  connectMongoDb,
};
