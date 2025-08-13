const mongoose = require("mongoose");
const entrySchema = new mongoose.Schema({
  userId: { type: String},
  displayname: { type: String},
  disc:{ type: String},
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  summary: { type: String },
  tags: [String],
},{timestamps:true});

const entryModel = mongoose.model("Entry", entrySchema);

module.exports = entryModel;
