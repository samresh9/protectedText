const express = require("express");
const { validationResult } = require("express-validator");
const Note = require("../models/notesModel");
const userDataValidateChain = require("../validations/notesRoutesValidations");
const {
  handleValidationErrors,
} = require("../middlewares/validationErrorsHandlerMiddleware");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const noteID = req.params.id;
    const noteData = await Note.findOne({ noteId: noteID });
    return res.json({ noteID: noteData.noteId, content: noteData.content });
  } catch (err) {
    return next(err);
  }
});

router.post(
  "/",
  userDataValidateChain,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { noteId, content } = req.body;
      const checkData = await Note.findOne({ noteId });
      if (checkData) {
        return res.json({ "noteId already present in Db": true });
      }
      const noteData = await Note.create({ noteId, content });
      return res.json({ noteID: noteData.noteId, content: noteData.content });
    } catch (err) {
      return next(err);
    }
  }
);

router.put(
  "/",
  userDataValidateChain,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { noteId, content } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(errors.array()[0].msg);
      }
      const updatedData = await Note.findOneAndUpdate(
        { noteId },
        { content },
        { returnDocument: "after" }
      );
      if (!updatedData) {
        return res.status(400).json({ error: "Invalid noteId " });
      }
      return res.json({
        noteID: updatedData.noteId,
        content: updatedData.content,
      });
    } catch (err) {
      return next(err);
    }
  }
);
module.exports = router;
