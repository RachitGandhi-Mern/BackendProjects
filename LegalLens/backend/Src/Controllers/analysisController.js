const mongoose = require("mongoose");
const { asyncHandler } = require("../Middleware/asyncHandler.js");
const { extractTextFromGridFS } = require("../Utils/textExtract.js");
const Analysis = require("../Model/analysis.model.js");
const { analyzeText } = require("../Services/ai.service.js");


exports.analyzeFromText = asyncHandler(async (req, res) => {
  const { text } = req.body;
  
  const result = await analyzeText(text);
  const doc = await Analysis.create({
    user: req.user._id,
    text,
    result
  });

  res.status(201).json(doc);
});


exports.analyzeFromFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  if (!mongoose.isValidObjectId(fileId)) {
    return res.status(400).json({ message: "Invalid fileId" });
    }

  const { text, filename } = await extractTextFromGridFS(fileId);
  const result = await analyzeText(text);

  const doc = await Analysis.create({
    user: req.user._id,
    fileId,
    filename,
    text,
    result
  });

  res.status(201).json(doc);
});


exports.listMyAnalyses = asyncHandler(async (req, res) => {
  const items = await Analysis.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select("-__v");
  res.json(items);
});


exports.getAnalysis = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const doc = await Analysis.findOne({ _id: id, user: req.user._id }).select("-__v");
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
});