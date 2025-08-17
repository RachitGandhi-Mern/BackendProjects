const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let GFSBucket;

async function ConnectTODB() {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGO_URI missing in env");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 20,
    });

    GFSBucket = new GridFSBucket(connection.connection.db, {
      bucketName: "documents",
    });

    console.log("✅ MongoDB connected & GridFS bucket ready");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

async function getGFS() {
  if (!GFSBucket) {
    throw new Error("GridFS not initialized yet");
  }
  return GFSBucket;
}

module.exports = { ConnectTODB, getGFS };
