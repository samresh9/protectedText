const { body } = require("express-validator");

const noteSchema = [
  body("id").notEmpty().withMessage("Note unique id is required"),
  body("encryptedContent")
    .notEmpty()
    .withMessage("Encrypted Content  is required"),
  body("initHash").notEmpty().withMessage("Initial Hash Content is required"),
  body("currentHash")
    .notEmpty()
    .withMessage("Current Hash Content is required"),
];
const encryptSchema = [
  body("content").notEmpty().withMessage("Note is required"),
  body("secretKey").notEmpty().withMessage("Secret Key  is required"),
];
const decryptSchema = [
  body("encryptedContent").notEmpty().withMessage("Encrypted Data is required"),
  body("secretKey").notEmpty().withMessage("Secret Key  is required"),
];

module.exports = { noteSchema, encryptSchema, decryptSchema };
