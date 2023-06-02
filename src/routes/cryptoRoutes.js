/**
 * @swagger
 * components:
 *   schemas:
 *     Encrypt:
 *       type: object
 *       required:
 *         - content
 *         - secretKey
 *       properties:
 *         content:
 *           type: string
 *           description: The content provided by the user
 *         secretKey:
 *           type: string
 *           description: The password of the site provided by the user
 *       example:
 *         content: NThe ew Turing Omnibus
 *         secretKey: Alexander K. Dewdney
 *     Decrypt:
 *       type: object
 *       required:
 *         - encryptedContent
 *         - secretKey
 *       properties:
 *         encryptedContent:
 *           type: string
 *           description: The encrypted content
 *         secretKey:
 *           type: string
 *           description: The password of the site provided by the user
 *   responses:
 *     404:
 *       description: The note is not found
 */
/**
 * @swagger
 * tags:
 *   name: Cryptos
 *   description: The Temporary API ufor encrypting and decrypting content
 */
/**
 * @swagger
 * /crypto/encrypt:
 *   post:
 *     summary: Encrypts the given content
 *     tags: [Cryptos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Encrypt"
 *           example:
 *             content: this is an example
 *             secretKey: secretKey
 *     responses:
 *       200:
 *         description: Successful Response with Encrypted and HashContent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 encryptedContent:
 *                   type: string
 *                 hashContent:
 *                   type: string
 *             example:
 *               encryptedContent: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *               hashContent: 3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               message: Content is required
 *               statusCode: 400
 *               stackTrae: Null
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /crypto/decrypt:
 *   post:
 *     summary: Decrypts the given content
 *     tags: [Cryptos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Decrypt"
 *           example:
 *             encryptedContent: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *             secretKey: secretKey
 *     responses:
 *       200:
 *         description: The given content is encrypted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 decryptedContent: adfasdfasfd
 *             example:
 *               decryptedContent: this is an example
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref : "#/components/schemas/Error"
 *             example:
 *               message: Secret Key  is required
 *               statusCode: 400
 *               stackTrae: Null
 *       500:
 *         description: Internal Server Error
 */

const express = require("express");
const {
  encryptData,
  decryptData,
  hashData,
} = require("../utils/encryptDecryptHandler");
const {
  encryptSchema,
  decryptSchema,
} = require("../validations/notesRoutesValidations");
const {
  schemaValidator,
} = require("../middlewares/validationErrorsHandlerMiddleware");

const router = express.Router();

router.post("/encrypt", schemaValidator(encryptSchema), (req, res) => {
  const { content, secretKey } = req.body;
  const encryptedContent = encryptData(content, secretKey);
  const hashContent = hashData(content, secretKey);
  return res.json({ encryptedContent, hashContent });
});

router.post("/decrypt", schemaValidator(decryptSchema), (req, res) => {
  const { encryptedContent, secretKey } = req.body;
  const content = decryptData(encryptedContent, secretKey);
  res.json({ decryptedContent: content });
});
module.exports = router;
