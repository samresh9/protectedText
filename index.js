require("dotenv").config();
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const {
  handle500Error,
  handleNotFound,
} = require("./middlewares/handleErrorsMiddleware");
const logger = require("./log/logger");

const app = express();
// Create a file to store httplog from morgan
const httpLogs = fs.createWriteStream(path.join(__dirname, "httpMorgan.log"), {
  flags: "a",
});
// Creating new tokens

morgan.token("type", (req, _res) => {
  return req.headers["Content-type"];
});

// Using format string of predefined tokens
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :type",
    { stream: httpLogs }
  )
);
const PORT = process.env.PORT || 7000;
const { connectMongoDb } = require("./connection");

connectMongoDb("mongodb://localhost:27017/protectedTextDB")
  .then(() => {
    logger.info("database connected");
  })
  .catch((err) => {
    logger.error(`error occured ${err}`);
  });

app.get("/", (req, res) => {
  logger.info("Inside home");
  res.send("hello");
});
app.get("/error", (_req, _res) => {
  logger.info("error");
  throw new Error("something is wrong");
});

app.use(handleNotFound);
app.use(handle500Error);

app.listen(PORT, () => {
  logger.info(`Server started at port ${PORT}`);
});
