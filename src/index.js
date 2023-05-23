require("dotenv").config();
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const cryptoRoutes = require("./routes/cryptoRoutes");
const {
  handle500Error,
  handleNotFound,
} = require("./middlewares/handleErrorsMiddleware");
const { connectMongoDb } = require("./connection");
const noteRoutes = require("./routes/notesRoutes");
const logger = require("./log/logger").child({ filename: __filename });

const app = express();
const PORT = process.env.PORT || 7000;
// Create a file to store httplog from morgan
const httpLogs = fs.createWriteStream(path.join(__dirname, "httpMorgan.log"), {
  flags: "a",
});
// Creating new tokens

morgan.token("type", (req, _res) => {
  return req.headers["Content-type"];
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Using format string of predefined tokens
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :type",
    { stream: httpLogs }
  )
);

app.use("/api/notes/", noteRoutes);
app.use("/crypto", cryptoRoutes);

app.get("/", async (req, res) => {
  logger.info("Inside home");
  res.send("Protected Text");
});
app.get("/error", (_req, _res) => {
  logger.info("error");
  throw new Error("something is wrong");
});

app.use(handleNotFound);
app.use(handle500Error);
(async () => {
  try {
    await connectMongoDb();
    app.listen(PORT, () => {
      logger.info(`Server started at port ${PORT}`);
    });
  } catch (Err) {
    logger.info("Database Connection Error:", Err);
  }
})();
