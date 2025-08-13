const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

async function GenerateDisc(content) {
  if (!content || content.trim() === "") {
    return "No content provided.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `
- New concepts they learned
- Problems they faced
- Achievements they made
- Ideas or thoughts about their coding journey

Your task:
1. Read the user's content carefully.
2. Identify if it is:
   - A learning note → Explain it in simple, beginner-friendly terms, with extra helpful context/examples.
   - A problem → Explain what the problem means, and give a clear, step-by-step solution or approach.
   - An achievement → Give a short, motivational summary celebrating it.
3. Always keep the tone simple, clear, and encouraging.
4. Avoid long paragraphs; keep it concise but informative.

User content:
"${content}"
    `}]
        }
      ]
    });

    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "AI description could not be generated.";
  }
}

module.exports = GenerateDisc;
