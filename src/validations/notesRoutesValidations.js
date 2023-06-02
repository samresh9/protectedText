const { body } = require("express-validator");

const noteSchema = [
  body("noteId").notEmpty().withMessage("Note unique id is required"),
  body("content").notEmpty().withMessage("Encrypted Content  is required"),
  body("hashContent").notEmpty().withMessage("Hash Content is required"),
];
const encryptSchema = [
  body("content").notEmpty().withMessage("Note is required"),
  body("secretKey").notEmpty().withMessage("Secret Key  is required"),
];
const decryptSchema = [
  body("encryptedContent").notEmpty().withMessage("Encrypted Data id required"),
  body("secretKey").notEmpty().withMessage("Secret Key  is required"),
];

module.exports = { noteSchema, encryptSchema, decryptSchema };
