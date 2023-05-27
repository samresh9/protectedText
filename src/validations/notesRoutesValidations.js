const { body } = require("express-validator");

const userDataValidateChain = [
  body("noteId").notEmpty().withMessage("Note unique id is required"),
  body("content").notEmpty().withMessage("Encrypted Content  is required"),
  body("hashContent").notEmpty().withMessage("Hash Content is required"),
];

module.exports = { userDataValidateChain };
