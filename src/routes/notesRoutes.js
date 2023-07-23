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
 *         id:
 *           type: string
 *           description: The unique ID that represents the URL
 *           uniqueItems: true
 *         encryptedContent:
 *           type: string
 *           description: The encrypted content provided by the user
 *         hash:
 *           type: string
 *           description: The hash of the content provided by the user
 *       example:
 *         id: samresh
 *         encryptedContent: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *         hash: 3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918
 *     BadRequestError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error Message
 *         code:
 *           type: number
 *           description: Specific Error Code
 *         errors:
 *           type: array
 *           description: Description Of Error
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of error
 *               msg:
 *                 type: string
 *                 description: Error message
 *               path:
 *                 type: string
 *                 description: Path of the field with the error
 *               location:
 *                 type: string
 *                 description: Location of the error (e.g., body, query, path, etc.)
 *     InternalServerError:
 *       type: object
 *       properties:
 *         message:
 *          type: string
 *          description: Error Message
 *       example:
 *         message: Message of Error
 *     NoteResponse:
 *       type: object
 *       required:
 *         - noteId
 *         - content
 *       properties:
 *         new:
 *           type: boolean
 *           description: The value indicates either note is new or not
 *         updated:
 *           type: boolean
 *           description: The encrypted content provided by the user
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The unique note ID
 *             content:
 *               type: object
 *               description: The  content
 *               properties:
 *                 encrypted:
 *                   type: string
 *                   description: The encrypted content
 *                 decrypted:
 *                   type: null
 *                   description: This value is null
 *     GetByIdResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The unique note ID
 *             content:
 *               type: object
 *               description: The  content
 *               properties:
 *                 encrypted:
 *                   type: string
 *                   description: The encrypted content
 *                 decrypted:
 *                   type: null
 *                   description: This value is null
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
 *               $ref: '#/components/schemas/NoteResponse'
 *             examples:
 *               NewNoteExample:
 *                 value:
 *                   new: true
 *                   updated: false
 *                   data:
 *                     id: samresh
 *                     content:
 *                       encrypted: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                       decrypted: null
 *                 summary: Example response for new note
 *               UpdateNoteExample:
 *                 value:
 *                   new: false
 *                   updated: true
 *                   data:
 *                     id: samresh
 *                     content:
 *                       encrypted: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                       decrypted: null
 *                 summary: Example response for update note
 *               NoChangeInNoteExample:
 *                 value:
 *                   new: false
 *                   updated: false
 *                   data:
 *                     id: samresh
 *                     content:
 *                       encrypted: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                       decrypted: null
 *                 summary: Example response for no change in existing note
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref : '#/components/schemas/BadRequestError'
 *             example:
 *               message: Note unique id is required
 *               code: VALIDATION_ERROR
 *               errors:
 *                 - type: "field"
 *                   msg: "Note unique id is required"
 *                   path: "id"
 *                   location: "body"
 *       500:
 *         $ref : '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get the content by note ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               $ref : "#/components/schemas/GetByIdResponse"
 *             example:
 *               data:
 *                 id: samresh
 *                 content:
 *                   encrypted: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                   decrypted: null
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref : "#/components/schemas/BadRequestError"
 *             example:
 *               message: Not Found GET /api/notes/dfasfd
 *               code: NOT_FOUND
 *
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
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
    const { id } = req.params;
    const noteData = await Note.findOne({ id });
    if (!noteData) {
      return next();
    }

    return res.json({
      data: {
        id: noteData.id,
        content: {
          encrypted: noteData.encryptedContent,
          decrypted: null,
        },
      },
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/", schemaValidator(noteSchema), async (req, res, next) => {
  try {
    const { id, encryptedContent, hash } = req.body;
    const existingSite = await Note.findOne({ id });
    if (existingSite?.hash === hash) {
      return res.json({
        new: false,
        updated: false,
        data: {
          id: existingSite.id,
          content: {
            encrypted: existingSite.encryptedContent,
            decrypted: null,
          },
        },
      });
    }
    if (existingSite) {
      existingSite.hash = hash;
      existingSite.encryptedContent = encryptedContent;
      await existingSite.save();
      return res.json({
        new: false,
        updated: true,
        data: {
          id: existingSite.id,
          content: {
            encrypted: existingSite.encryptedContent,
            decrypted: null,
          },
        },
      });
    }
    const noteData = await Note.create({
      id,
      encryptedContent,
      hash,
    });
    return res.json({
      new: true,
      updated: false,
      data: {
        id: noteData.id,
        content: {
          encrypted: noteData.encryptedContent,
          decrypted: null,
        },
      },
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
