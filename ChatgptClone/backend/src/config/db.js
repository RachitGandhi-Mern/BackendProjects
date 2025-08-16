const mongoose = require("mongoose");

async function connectToDb() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // optional tuning
      serverSelectionTimeoutMS: 5000, // Timeout if DB not reachable
      maxPoolSize: 10, // Connection pool size
    });

    console.log(
      `✅ MongoDB Connected: ${connection.connection.host} / ${connection.connection.name}`
    );

    // Handle DB connection errors after initial connection
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Retrying...");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🛑 MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
}

module.exports = connectToDb;