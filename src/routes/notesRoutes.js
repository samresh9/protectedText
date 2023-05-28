const express = require("express");
const Note = require("../models/notesModel");
const { saveSchema } = require("../validations/notesRoutesValidations");
const {
  schemaValidator,
} = require("../middlewares/validationErrorsHandlerMiddleware");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const noteID = req.params.id;
    const noteData = await Note.findOne({ noteId: noteID });
    if (!noteData) {
      return res.json({ newSite: true });
    }
    return res.json({
      noteID: noteData.noteId,
      content: noteData.content,
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/", schemaValidator(saveSchema), async (req, res, next) => {
  try {
    const { noteId, content, hashContent } = req.body;
    const existingSite = await Note.findOne({ noteId });
    if (existingSite?.hashContent === hashContent) {
      return res.json({ changeInData: "false" });
    }
    if (existingSite) {
      existingSite.hashContent = hashContent;
      existingSite.content = content;
      await existingSite.save();
      return res.json({
        updated: "true",
        updatedData: {
          noteID: existingSite.noteId,
          content: existingSite.content,
        },
      });
    }
    const noteData = await Note.create({
      noteId,
      content,
      hashContent,
    });
    return res.json({ noteID: noteData.noteId, content: noteData.content });
  } catch (err) {
    return next(err);
  }
});

// router.put(
//   "/",
//   userDataValidateChain,
//   handleValidationErrors,
//   async (req, res, next) => {
//     try {
//       const { noteId, content } = req.body;
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         throw new Error(errors.array()[0].msg);
//       }
//       const updatedData = await Note.findOneAndUpdate(
//         { noteId },
//         { content },
//         { returnDocument: "after" }
//       );
//       if (!updatedData) {
//         return res.status(400).json({ error: "Invalid noteId " });
//       }
//       return res.json({
//         noteID: updatedData.noteId,
//         content: updatedData.content,
//       });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );
module.exports = router;