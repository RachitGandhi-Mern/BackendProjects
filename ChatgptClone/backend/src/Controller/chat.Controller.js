const chatModel = require("../Models/Chat.model");

exports.createChat = async (req, res) => {
  try {
    const { title } = req.body;
    const user = req.user;

    const chat = await chatModel.create({
      user:user._id,
      title,
    });
    res.status(201).json({
      messgae: "chat Created succesfully",
      user: chat.user,
      title: chat.title,
      lastActivity: chat.lastActivity,
      _id: chat._id
    });
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
};

exports.getChats = async (req, res) => {
  try {
    const user = req.user;
    const chats = await chatModel.find({ user: user._id }).sort({ updatedAt: -1 }).lean();
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await require('../Models/Message.model').find({ chat: id }).sort({ createdAt: 1 }).lean();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

