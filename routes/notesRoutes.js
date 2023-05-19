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

router.post("/", async (req, res) => {
  try {
    const { noteId, content } = req.body;
    if (!noteId || !content) {
      return res.status(400).json("NoteId and content are required.");
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

router.put("/", async (req, res) => {
  try {
    const { noteId, content } = req.body;
    if (!noteId || !content) {
      return res.status(400).json("NoteId and content are required.");
    }
    const updatedData = await Note.findOneAndUpdate(
      { noteId },
      { content },
      { returnDocument: "after" }
    );
    return res.json({ updatedData });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
module.exports = router;
