/**
 * @swagger
 * components:
 *   schemas:
 *     Encrypt:
 *       type: object
 *       required:
 *         - content
 *         - secretKey
 *         - siteId
 *       properties:
 *         content:
 *           type: string
 *           description: The content provided by the user
 *         secretKey:
 *           type: string
 *           description: The password of the site provided by the user
 *       example:
 *         content: This is a example
 *         secretKey: secretKey
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
 *     InternalServerError:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/InternalServerError"
 *           example:
 *             message: <Message From Error>
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
 *             siteId: samresh
 *     responses:
 *       200:
 *         description: Successful Response with Encrypted and HashContent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: object
 *                       properties:
 *                         encrypted:
 *                           type: string
 *                           description: The encrypted content of given plain content.
 *                         hash:
 *                           type: string
 *                           description: The hash value of the given content and secretKey.
 *                         decrypted:
 *                           type: null
 *                           description: This value is null.
 *             example:
 *               data:
 *                 content:
 *                   encrypted: U2FsdGVkX1804hyR1YLCzUxbN0oIZn/4dHoQgh0uV1QTOFag62NWS6zM6PCkIsLb
 *                   hash: 3fb303c89207ddbfbf71fb4299fe6374d7adb298d56f43e5d2e1760b2dd1b00b27f16d3e39ebde4ca23109e9dd158b84e1a03bbba0c1b4a7fb586e3e0e6e6918
 *                   decrypted: null
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequestError"
 *             example:
 *               message: Secret Key  is required
 *               code: VALIDATION_ERROR
 *               errors:
 *                 - type: "field"
 *                   msg: "Secret Key is required"
 *                   path: "encryptedContent"
 *                   location: "body"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: object
 *                       properties:
 *                         encrypted:
 *                           type: null
 *                           description: The encrypted content is null.
 *                         hash:
 *                           type: string
 *                           description: The hash value is null.
 *                         decrypted:
 *                           type: string
 *                           description: This value is null.
 *             example:
 *               data:
 *                 content:
 *                   encrypted: null
 *                   hash: null
 *                   decrypted: this is an example82b6f2847220152242ed3aeb026215289dbf62d0b6587775dedccf9b414d0db92584a3082322496fd84b8b1e0d0ba19dfd15222a38a6cb1b4971af794ed119ef
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref : "#/components/schemas/BadRequestError"
 *             example:
 *               message: Secret Key  is required
 *               code: Validation Error
 *               errors:
 *                 - type: "field"
 *                   msg: "Encrypted Data id required"
 *                   path: "encryptedContent"
 *                   location: "body"
 *                 - type: "field"
 *                   msg: "Secret Key is required"
 *                   path: "secretKey"
 *                   location: "body"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */

const express = require("express");
const {
  encryptData,
  decryptData,
  hashData,
  hashSite,
} = require("encrypt-handler");
const {
  encryptSchema,
  decryptSchema,
} = require("../validations/notesRoutesValidations");
const {
  schemaValidator,
} = require("../middlewares/validationErrorsHandlerMiddleware");

const router = express.Router();

router.post("/encrypt", schemaValidator(encryptSchema), (req, res) => {
  const { content, secretKey, siteId } = req.body;
  const siteHash = hashSite(siteId);
  const encryptedContent = encryptData(String(content + siteHash), secretKey);
  const hash = hashData(content, secretKey);
  return res.json({
    data: {
      content: {
        encrypted: encryptedContent,
        hash,
        decrypted: null,
      },
    },
  });
});

router.post("/decrypt", schemaValidator(decryptSchema), (req, res) => {
  const { encryptedContent, secretKey } = req.body;
  const content = decryptData(encryptedContent, secretKey);
  res.json({
    data: {
      content: {
        encrypted: null,
        hash: null,
        decrypted: content,
      },
    },
  });
});
module.exports = router;
