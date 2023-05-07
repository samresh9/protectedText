const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const { connectMongoDb } = require("./connection");

connectMongoDb("mongodb://localhost:27017/protectedTextDB")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.get("/", (req, res) => {
  res.send("hello");
})


app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
