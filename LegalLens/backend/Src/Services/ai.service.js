const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY || null;
const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const genAI = apiKey ? new GoogleGenAI(apiKey) : null;

export async function analyzeText(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) throw new Error("Empty text cannot be analyzed");

  if (!apiKey) {
    return {
      summary:
        "This document outlines responsibilities, payment terms, confidentiality, and termination for a service agreement.",
      key_clauses: [
        { title: "Payment Terms", explanation: "Invoices due within 30 days." },
        {
          title: "Confidentiality",
          explanation:
            "Parties agree not to disclose proprietary information without consent."
        },
        {
          title: "Termination",
          explanation:
            "Either party may terminate with written notice as specified."
        }
      ],
      risks: [
        "Late payment penalties may be high.",
        "Termination notice period may be one-sided."
      ],
      simplified_terms:
        "Pay on time, keep shared info private, and note that ending the contract needs advance notice."
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: modelName });

    const systemPrompt =
      "You are a legal document assistant. Analyze the contract and return strict JSON with keys: summary, key_clauses (array of {title, explanation}), risks (array of strings), simplified_terms (string). Keep it concise and practical for non-legal users.";

    const userPrompt = `Analyze this document and respond ONLY with JSON:\n\n${trimmed}\n`;

    const response = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: userPrompt }] }
      ],
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 }
    });

    const textPart = response.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const start = textPart.indexOf("{");
    const end = textPart.lastIndexOf("}");
    const maybeJson = start !== -1 && end !== -1 ? textPart.slice(start, end + 1) : textPart;

    const parsed = JSON.parse(maybeJson);

    return {
      summary: String(parsed.summary || "").trim(),
      key_clauses: Array.isArray(parsed.key_clauses)
        ? parsed.key_clauses.map((c) => ({
            title: String(c.title || "").trim(),
            explanation: String(c.explanation || "").trim()
          }))
        : [],
      risks: Array.isArray(parsed.risks)
        ? parsed.risks.map((r) => String(r || "").trim())
        : [],
      simplified_terms: String(parsed.simplified_terms || "").trim()
    };
  } catch (err) {
    console.error("AI analysis error:", err);
    throw new Error("Failed to analyze text");
  }
}
