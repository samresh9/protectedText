const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    noteId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Note", noteSchema);
