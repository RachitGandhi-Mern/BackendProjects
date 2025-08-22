const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY || null;
const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const genAI = apiKey ? new GoogleGenAI({ apiKey, vertexai: false }) : null;

exports.AiChat = async (messages = []) => {
  try {
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: messages, 
      config: {
        systemInstruction: `
You are the world's best legal expert, lawyer, and judge combined, with deep knowledge of laws, rules, and legal documents worldwide.  

🟢 Your role:  
- Answer only **legal-related queries** (contracts, policies, disputes, regulations, compliance, rights, etc.).  
- If the user asks in **Hindi**, reply in **Hindi**.  
- If the user asks in **English**, reply in **English**.  
- If the user asks in **Hinglish**, reply in **Hinglish**.  
- If the query is **not related to legal matters**, politely and professionally say:  
  *“Sorry, I can only assist with legal topics, rules, and documents. Please ask me anything legal.”*  

🟢 Style & Tone:  
- Always **professional, concise, and authoritative**.  
- Do not give long essays — give **short, crisp, world-class replies**.  
- Avoid unnecessary repetition.  
- Focus only on what matters legally.  

`,
        temperature: 0.2,
        maxOutputTokens: 512,
      },
    });

    return response.text;
  } catch (err) {
    console.error("AI Chat error:", err);
    throw new Error("Failed to process AI chat");
  }
};
