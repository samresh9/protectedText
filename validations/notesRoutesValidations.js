const { body } = require("express-validator");

function notesValidator() {
  return [
    body("noteId").notEmpty().withMessage("Note unique id is required"),
    body("content").notEmpty().withMessage("Encrypted Content  is required"),
  ];
}
module.exports = notesValidator;
