const express = require('express')
const Router = express.Router()
const {entryIn, getEnrites, getdisc, Contributions, deleteEntry, getUserEntries} = require("../Controllers/entryController")
const authenticateUser = require('../Middleware/authenticateUser')

Router.post('/', entryIn)
Router.get("/getenrites" ,getEnrites)
Router.post("/generate-description" ,getdisc)
Router.get("/contributions",authenticateUser,Contributions)
Router.get("/my", authenticateUser, getUserEntries);
Router.delete("/:id", authenticateUser, deleteEntry);


module.exports = Router