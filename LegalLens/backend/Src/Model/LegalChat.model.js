const mongoose = require("mongoose");

const AiChatSchema = new mongoose.Schema(
  {
    messages: [
      {
        role: { type: String, enum: ["user", "model"], required: true },
        text: { type: String, required: true },
      },
    ],
    response: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AiChat", AiChatSchema);
