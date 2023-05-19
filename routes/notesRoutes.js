const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../models/notesModel");

const router = express.Router();
const validationRules = [
  body("noteId").notEmpty().withMessage("Note unique id is required"),
  body("content").notEmpty().withMessage("Encrypted Content  is required"),
];

router.get("/:id", async (req, res) => {
  const noteID = req.params.id;
  const noteData = await Note.findOne({ noteId: noteID });
  if (!noteData) {
    return res.json({ have_noteId: false, newUser: true });
  }
  return res.json({ noteID: noteData.noteId, content: noteData.content });
});

router.post("/", validationRules, async (req, res) => {
  try {
    const { noteId, content } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const checkData = await Note.findOne({ noteId });
    if (checkData) {
      return res.json({ "noteId already present in Db": true });
    }
    const noteData = await Note.create({ noteId, content });
    return res.json({ noteID: noteData.noteId, content: noteData.content });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.put("/", validationRules, async (req, res) => {
  try {
    const { noteId, content } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updatedData = await Note.findOneAndUpdate(
      { noteId },
      { content },
      { returnDocument: "after" }
    );
    if (!updatedData) {
      return res.status(400).json({ error: "Invalid noteId " });
    }
    return res.json({ updatedData });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
module.exports = router;
