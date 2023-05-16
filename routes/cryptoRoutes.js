const express = require("express");
const { encryptData, decryptData } = require("../utils/encryptDecryptHandler");
const logger = require("../log/logger");

const router = express.Router();
router.post("/encrypt", (req, res) => {
  try {
    const { note } = req.body;
    if (!note) {
      throw new Error("Note is required");
    }
    const encryptedData = encryptData(note);
    res.json({ encryptedData });
  } catch (err) {
    logger.error(` Inside cryptoRoutes ,Message:-${err.message}`);
    res.status(400).json({ error: err.message });
  }
});

router.post("/decrypt", (req, res) => {
  try {
    const { encryptedData } = req.body;
    if (!encryptedData) {
      throw new Error("Data is required");
    }
    const note = decryptData(encryptedData);
    res.json({ note });
  } catch (err) {
    logger.error(err.stack);
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
