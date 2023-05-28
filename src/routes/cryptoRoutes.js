const express = require("express");
const {
  encryptData,
  decryptData,
  hashData,
} = require("../utils/encryptDecryptHandler");
const {
  encryptSchema,
  decryptSchema,
} = require("../validations/notesRoutesValidations");
const {
  schemaValidator,
} = require("../middlewares/validationErrorsHandlerMiddleware");

const router = express.Router();

router.post("/encrypt", schemaValidator(encryptSchema), (req, res) => {
  const { content, secretKey } = req.body;
  const encryptedContent = encryptData(content, secretKey);
  const hashContent = hashData(content, secretKey);
  return res.json({ encryptedContent, hashContent });
});

router.post("/decrypt", schemaValidator(decryptSchema), (req, res) => {
  const { encryptedContent, secretKey } = req.body;
  const content = decryptData(encryptedContent, secretKey);
  res.json({ decryptedData: content });
});
module.exports = router;
