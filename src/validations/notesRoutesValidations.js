const { body } = require("express-validator");

const saveSchema = [
  body("noteId").notEmpty().withMessage("Note unique id is required"),
  body("content").notEmpty().withMessage("Encrypted Content  is required"),
  body("hashContent").notEmpty().withMessage("Hash Content is required"),
];
const encryptSchema = [
  body("note").notEmpty().withMessage("Note is required"),
  body("secretKey").notEmpty().withMessage("Secret Key  is required"),
];
const decryptSchema = [
  body("encryptedData").notEmpty().withMessage("Encrypted Data id required"),
  body("secretKey").notEmpty().withMessage("Secret Key  is required"),
];

module.exports = { saveSchema, encryptSchema, decryptSchema };
