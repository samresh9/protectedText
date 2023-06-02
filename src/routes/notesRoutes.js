/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - noteId
 *         - content
 *         - hashContent
 *       properties:
 *         noteId:
 *           type: string
 *           description: The unique ID that represents the URL
 *           uniqueItems: true
 *         content:
 *           type: string
 *           description: The encrypted content provided by the user
 *         hashContent:
 *           type: string
 *           description: The hash of the content provided by the user
 *       example:
 *         noteId: samresh
 *         content: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *         hashContent: 3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error Message with Method and Route
 *         statusCode:
 *           type: number
 *           description: Status Code
 *         stackTrace:
 *           type: string
 *           description: Error Stack Trace
 *     NewNoteResponse:
 *       type: object
 *       required:
 *         - noteId
 *         - content
 *       properties:
 *         noteId:
 *           type: string
 *           description: The unique ID that represents the URL
 *           uniqueItems: true
 *         content:
 *           type: string
 *           description: The encrypted content provided by the user
 *     UpdateNoteResponse:
 *       type: object
 *       required:
 *         - noteId
 *         - content
 *       properties:
 *         updated:
 *           type: boolean
 *           description: Indicates if the note was updated successfully
 *         updatedData:
 *           type: object
 *           properties:
 *             noteId:
 *               type: string
 *               description: This is any unique id that represents the URL
 *               uniqueItems: true
 *             content:
 *               type: string
 *               description: The encrypted content provided by the user
 *     NoChangeInNoteResponse:
 *       type: object
 *       required:
 *         -changeInData
 *       properties:
 *         changeInData:
 *           type: boolean
 *           description: Indicates that there was no change in the given Data
 */

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for creating, updating, and getting notes
 */
/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note or update an existing note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *             example:
 *         noteId: samresh
 *         content: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *         hashContent: 3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918
 *     responses:
 *       200:
 *         description:  Note created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/NewNoteResponse'
 *                 - $ref: '#/components/schemas/UpdateNoteResponse'
 *                 - $ref: '#/components/schemas/NoChangeInNoteResponse'
 *             examples:
 *               NewNoteExample:
 *                 value:
 *                   noteId: samresh
 *                   content: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                 summary: Example response for new note
 *               UpdateNoteExample:
 *                 value:
 *                   updated: true
 *                   updatedData:
 *                     noteId: samresh
 *                     content: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                 summary: Example response for update note
 *               NoChangeInNoteExample:
 *                 value:
 *                   changeInData: false
 *                 summary: Example response for no change in existing note
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref : '#/components/schemas/Error'
 *             example:
 *               message: noteId is required
 *               statusCode: 400
 *               stackTrae: null
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/notes/{noteId}:
 *   get:
 *     summary: Get the content by note ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Encrypted content of the given note ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 noteId:
 *                   type: string
 *                   description: The unique noteId that gives the URL
 *                 content:
 *                   type: string
 *                   description: The encrypted content from the NoteId
 *               example:
 *                 noteId: Samresh
 *                 content: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref : "#/components/schemas/Error"
 *             example:
 *               message: Not Found GET /api/notes/dfasfd
 *               statusCode: 404
 *               stackTrae: null
 *
 *       500:
 *         description: Internal Server Error
 */

const express = require("express");
const Note = require("../models/notesModel");
const { noteSchema } = require("../validations/notesRoutesValidations");
const {
  schemaValidator,
} = require("../middlewares/validationErrorsHandlerMiddleware");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const noteData = await Note.findOne({ noteId });
    if (!noteData) {
      const error = new Error(`Not Found ${req.method} ${req.originalUrl}`);
      res.statusCode = 404;
      next(error);
    }
    return res.json({
      noteId: noteData.noteId,
      content: noteData.content,
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/", schemaValidator(noteSchema), async (req, res, next) => {
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

module.exports = router;
