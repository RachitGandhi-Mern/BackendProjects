const { AiChat } = require("../Services/aiChat.service");
const AiChatModel = require("../Model/LegalChat.model");

/**
 * Controller for AI Chat
 */
exports.ask = async (req, res, next) => {
  try {
    const { messages } = req.body; 

    const result = await AiChat(messages);

    await AiChatModel.create({ messages, response: result });

    res.json({ reply: result });
  } catch (err) {
    next(err);
  }
};
