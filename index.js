const express = require('express');

const app = express();
const PORT = 5000;
const { connectMongoDb } = require('./connection');

connectMongoDb('mongodb://localhost:27017/protectedTextDB').then(() => {
  console.log('Database Connected');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
