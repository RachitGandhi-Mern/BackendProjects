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
