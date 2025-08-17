const mongoose = require("mongoose");

const clauseSchema = new mongoose.Schema(
  { title: String, explanation: String },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: false },
    filename: { type: String, required: false },
    text: { type: String, required: true },
    result: {
      summary: { type: String, default: "" },
      key_clauses: { type: [clauseSchema], default: [] },
      risks: { type: [String], default: [] },
      simplified_terms: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Analysis", analysisSchema);