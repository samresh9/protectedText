require("dotenv").config();
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cryptoRoutes = require("./routes/cryptoRoutes");

const {
  handle500Error,
  handleNotFound,
} = require("./middlewares/handleErrorsMiddleware");
const noteRoutes = require("./routes/notesRoutes");
const {
  unhandledRejectionsHandler,
  uncaughtExceptionHandler,
} = require("./utils/handleExceptionAndRejections");
const options = require("./swaggerOptions");

// handle uncaught exception and rejections
process.on("uncaughtException", uncaughtExceptionHandler);
process.on("unhandledRejection", unhandledRejectionsHandler);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// swagger
const specs = swaggerJsdoc(options);
// Create a file to store httplog from morgan
const httpLogs = fs.createWriteStream(path.join(__dirname, "httpMorgan.log"), {
  flags: "a",
});
// Creating new tokens
app.get("/uncaught", async (_req, _res) => {
  throw new Error("uncaught f f f");
});

morgan.token("type", (req, _res) => req.headers["Content-type"]);
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

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
  })
);
app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

app.use(handleNotFound);
app.use(handle500Error);

module.exports = app;
