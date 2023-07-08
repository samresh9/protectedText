const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "A note ID is required"],
      unique: true,
    },
    encryptedContent: {
      type: String,
      required: [true, "A note content is required"],
    },
    hash: {
      type: String,
      required: [true, "A hash of content is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
