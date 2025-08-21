const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/User.model");
const aiService = require('../Services/ai.service');
const { response } = require("../app");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
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
    console.log("✅ New Socket Connected:", socket.id, "User:", socket.user?.email);


socket.on('ai-message',async(messagePayload)=>{
const content = await messagePayload.message
  const Response = await aiService(content)
  

 socket.emit("ai-response", {
          Chat: content,
          Responses: Response,
        });

})

  });

  return io;


}

module.exports = initSocketServer;