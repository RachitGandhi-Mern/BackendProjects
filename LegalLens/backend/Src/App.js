const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { ConnectTODB } = require("../Src/config/db");

const authRouter = require("./Router/auth.Route");
const fileRoutes = require("./Router/file.Routes");
const analysisRoutes = require("./Router/analysis.Routes");
const { errorHandler, notFound } = require("./Middleware/errorHandler");
const legalChatRoutes = require("./Router/LegalChat.Routes");

ConnectTODB();

app.use(helmet());
app.use(
  cors({
    origin: [
      "https://legalparser.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
});

app.use(limiter);

app.use("/api/auth", authRouter);
app.use("/api/files", fileRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/legalchat", legalChatRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
