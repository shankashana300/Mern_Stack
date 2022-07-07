const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    type:{type:Number},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);
