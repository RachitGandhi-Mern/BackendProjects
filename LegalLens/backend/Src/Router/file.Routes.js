const express = require('express')
const Router = express.Router()
const { downloadFile, uploadFile, uploadMiddleware } = require("../Controllers/fileController.js");
const { ProtectedRoute } = require("../Middleware/ProtectedRoute.js");


Router.post("/upload", ProtectedRoute, uploadMiddleware, uploadFile);
Router.get("/:id", ProtectedRoute, downloadFile);

module.exports = Router