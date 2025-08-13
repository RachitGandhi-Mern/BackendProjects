const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tags: [String],
},{timestamps:true});

module.exports = mongoose.model('Blog', BlogSchema);