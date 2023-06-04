const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    noteId: {
      type: String,
      required: [true, "A note ID is required"],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "A note content is required"],
    },
    hashContent: {
      type: String,
      required: [true, "A hash content is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
