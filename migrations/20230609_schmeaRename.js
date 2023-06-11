require("dotenv").config();
const logger = require("../src/log/logger").child({ filename: __filename });
const Note = require("../src/models/notesModel");
const { connectMongoDb } = require("../src/connection");

const migrateData = async () => {
  try {
    await Note.collection.dropIndex("noteId_1");
    const notes = await Note.find();
    const transformedNotes = notes
      .filter((note) => !note.id)
      .map((oldNote) => {
        const plainNote = oldNote.toObject();
        return {
          id: plainNote.noteId,
          encryptedContent: plainNote.content,
          hash: plainNote.hashContent,
          createdAt: plainNote.createdAt,
          updatedAt: plainNote.updatedAt,
        };
      });
    await Note.insertMany(transformedNotes);
    await Note.deleteMany({ id: { $exists: false } });
    await Note.createIndexes();
    logger.info("Data migration success");
  } catch (error) {
    logger.error("errror occur", error);
    throw new Error(error.message);
  }
};

(async () => {
  try {
    await connectMongoDb();
    logger.info("Connected to MongoDB");
    await migrateData();
    process.exit(0);
  } catch (error) {
    logger.error("Error occurred during migration", error);
    process.exit(1);
  }
})();
