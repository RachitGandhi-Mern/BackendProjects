const {getGFS} = require('../config/db')
const mongoose = require('mongoose')
const pdfParse = require('pdf-parse')
const mammoth = require('mammoth')
const mime = require('mime-types')

const bufferFromStream = (stream) =>
    new Promise((resolve , reject) =>{
      const chunks = []
      stream.on('data',(d)=> chunks.push(d));
      stream.on('error',reject);
      stream.on('end',()=>resolve(Buffer.concat(chunks)))
    });

    exports.getFileMetadata = async(fileId) =>{
      const gfs = getGFS();
      const cursor = gfs.find({_id:new mongoose.Types.ObjectId(fileId)})
      const files = await cursor.toArray();
      if (!files.length) throw new Error("File not found");
  return files[0]; 
};
    

exports.extractTextFromGridFS = async (fileId) => {
  const gfs = getGFS();
  const fileMeta = await exports.getFileMetadata(fileId);

  const downloadStream = gfs.openDownloadStream(fileMeta._id);
  const fileBuffer = await bufferFromStream(downloadStream);

  const contentType =
    fileMeta.contentType ||
    mime.lookup(fileMeta.filename || "") ||
    "application/octet-stream";

  // PDF
  if (contentType === "application/pdf" || (fileMeta.filename || "").endsWith(".pdf")) {
    const pdfData = await pdfParse(fileBuffer);
    const text = (pdfData.text || "").trim();
    if (!text) throw new Error("Unable to extract text from PDF");
    return { text, filename: fileMeta.filename || "document.pdf" };
  }

  // DOCX
  if (
    contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    (fileMeta.filename || "").endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    const text = (result.value || "").trim();
    if (!text) throw new Error("Unable to extract text from DOCX");
    return { text, filename: fileMeta.filename || "document.docx" };
  }

  // Fallback: treat as UTF-8 text
  const text = fileBuffer.toString("utf-8").trim();
  if (!text) throw new Error("Unsupported or empty file type for text extraction");
  return { text, filename: fileMeta.filename || "document.txt" };
};
