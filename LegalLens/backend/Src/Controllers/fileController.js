const multer = require("multer");
const mime = require("mime-types");
const { getGFS } = require("../config/db.js");
const mongoose = require("mongoose");
const { asyncHandler } = require("../Middleware/asyncHandler.js");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

exports.uploadMiddleware = upload.single("file");

exports.uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const gfs = getGFS();
  const contentType =
    req.file.mimetype ||
    mime.lookup(req.file.originalname || "") ||
    "application/octet-stream";

  const uploadStream = gfs.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
    metadata: { userId: req.user._id.toString() },
  });

  uploadStream.end(req.file.buffer);

  uploadStream.on("error", (err) => {
    res.status(500).json({ message: "File upload failed", error: err.message });
  });

  uploadStream.on("finish", async () => {
  try {
    const cursor = gfs.find({ _id: uploadStream.id })
    const files = await cursor.toArray()
    if (!files.length) return res.status(500).json({ message: "File not found" })
    
    const file = files[0]
    res.status(201).json({
      fileId: file._id.toString(),
      filename: file.filename,
      contentType: file.contentType,
      length: file.length,
      uploadDate: file.uploadDate
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch uploaded file", error: err.message })
  }
})

});

exports.downloadFile = asyncHandler(async (req, res) => {
  const gfs = getGFS();
  const fileId = new mongoose.Types.ObjectId(req.params.id);

  const cursor = gfs.find({ _id: fileId });
  const files = await cursor.toArray();
  if (!files.length) return res.status(404).json({ message: "File not found" });

  const file = files[0];
  res.setHeader("Content-Type", file.contentType || "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.filename}"`
  );

  const stream = gfs.openDownloadStream(fileId);
  stream.on("error", () => res.status(500).end());
  stream.pipe(res);
});
