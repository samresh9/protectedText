const { body } = require("express-validator");

const noteSchema = [
  body("id").notEmpty().withMessage("Note unique id is required"),
  body("encryptedContent")
    .notEmpty()
    .withMessage("Encrypted Content  is required"),
  body("hash").notEmpty().withMessage("Hash Content is required"),
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
