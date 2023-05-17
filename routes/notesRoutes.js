const express = require("express");
const Note = require("../models/notesModel");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const noteID = req.params.id;
  const noteData = await Note.findOne({ noteId: noteID });
  if (!noteData) {
    return res.json({ have_noteId: false, newUser: true });
  }
  return res.json({ noteID: noteData.noteId, content: noteData.content });
});

module.exports = router;
