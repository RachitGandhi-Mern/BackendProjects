const express = require('express')
const Router = express.Router()
const {ProtectedRoute} = require('../Middleware/ProtectedRoute.js')
const { analyzeFromText, analyzeFromFile, listMyAnalyses, getAnalysis, deleteAnalysis } =  require("../Controllers/analysisController.js");

Router.post("/from-text", ProtectedRoute, analyzeFromText);
Router.post("/from-file/:fileId", ProtectedRoute, analyzeFromFile);
Router.get("/", ProtectedRoute, listMyAnalyses);
Router.get("/:id", ProtectedRoute, getAnalysis);
Router.delete('/:id', ProtectedRoute, deleteAnalysis)

module.exports = Router