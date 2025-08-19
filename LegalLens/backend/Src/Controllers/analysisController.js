const mongoose = require("mongoose");
const { asyncHandler } = require("../Middleware/asyncHandler.js");
const { extractTextFromGridFS } = require("../Utils/textExtract.js");
const Analysis = require("../Model/analysis.model.js");
const { analyzeText } = require("../Services/ai.service.js");
const { getGFS } = require("../config/db.js");


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

if (!text || text.trim().length === 0) {
    return res.status(400).json({
      message: "Unable to extract text from this PDF. This may be a scanned image or an encrypted file."
    });
  }
  
  const result = await analyzeText(text);
  console.log(result)

  const doc = await Analysis.create({
    user: req.user._id,
    fileId,
    filename,
    text,
    result
  });

  res.status(201).json(doc);
});



exports.deleteAnalysis = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid analysis ID' })
  }

  const doc = await Analysis.findById(id)
  if (!doc) return res.status(404).json({ message: 'Analysis not found' })

  // Optionally: delete file from GridFS if fileId exists
  if (doc.fileId) {
    const gfs = getGFS()
    const fileId = new mongoose.Types.ObjectId(doc.fileId)
    gfs.delete(fileId, (err) => {
      if (err) console.error('GridFS delete error:', err.message)
    })
  }

  await doc.deleteOne()
  res.status(200).json({ message: 'Analysis deleted', id })
})




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