const express = require("express");

const fs = require("fs");
const path = require("path");

// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require("morgan");

const logger = require("./log/logger");

const app = express();
// Create a file to store httplog from morgan
const httpLogs = fs.createWriteStream(path.join(__dirname, "httpMorgan.log"), {
  flags: "a",
});
// Creating new tokens

morgan.token("type", (req, res) => {
  return req.headers["Content-type"];
});

// Using format string of predefined tokens
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :type",
    { stream: httpLogs }
  )
);
const PORT = process.env.PORT || 3001;
const { connectMongoDb } = require("./connection");

connectMongoDb("mongodb://localhost:27017/protectedTextDB")
  .then(() => {
    logger.info("database ok");
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
    logger.error(`error occured ${err}`);
  });

app.get("/", (req, res) => {
  logger.info("Inside home");
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
