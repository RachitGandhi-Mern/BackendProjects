const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/User.model");
const aiService = require("../Services/ai.service");
const messageModel = require("../Models/Message.model");
// const chatModel = require("../Models/Chat.model");
const {
  createMemoryVector,
  queryMemoryVector,
} = require("../Services/Vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
        cors: {
            origin: "https://ai--chatgpt.vercel.app",
            allowedHeaders: [ "Content-Type", "Authorization" ],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      const token = cookies.Token;

      if (!token) {
        return next(new Error("Authentication error: Token missing"));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);
      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }

      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(
      "✅ New Socket Connected:",
      socket.id,
      "User:",
      socket.user?.email
    );

    socket.on("ai-message", async (messagePayload) => {
      const content = await messagePayload;

      const [Message, vectors] = await Promise.all([
        messageModel.create({
          user: socket.user._id,
          chat: messagePayload.chat,
          content: content.message,
          role: "user",
        }),
        aiService.generateVectorEmb(content.message),
      ]);

      await createMemoryVector({
        vector: vectors,
        messageId: Message._id,
        metadata: {
          user: socket.user._id,
          chat: messagePayload.chat,
          text: messagePayload.message,
          role: "user",
        },
      });


      const [Memory, chatHistory] = await Promise.all([
        queryMemoryVector({
          queryVector: vectors,
          limit: 5,
          metadata: {
            user: socket.user._id,
          },
        }),
        messageModel
          .find({ chat: messagePayload.chat })
          .sort({ createdAt: -1 })
          .limit(5)
          .lean().then(messages => messages.reverse()),
          
      ]);

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = Memory.filter((item) => item.metadata.role).map((item) => ({
        role: item.metadata.role,
        parts: [
          {
            text: item.metadata.text,
          },
        ],
      }));

      const Response = await aiService.generateResponse([...ltm, ...stm]);

      const [ResponseMessage, ResponseVectors] = await Promise.all([
        messageModel.create({
          user: socket.user._id,
          chat: messagePayload.chat,
          content: Response,
          role: "model",
        }),
        aiService.generateVectorEmb(Response),
      ]);

      await createMemoryVector({
        vector: ResponseVectors,
        messageId: ResponseMessage._id,
        metadata: {
          user: socket.user._id,
          chat: messagePayload.chat,
          text: Response,
          role: "model",
        },
      });

      socket.emit("ai-response", {
        Chat: content,
        Responses: Response,
        Time: new Date().getHours() + ":" + new Date().getMinutes(),
      });
    });
  });

  return io;
}

module.exports = initSocketServer;
