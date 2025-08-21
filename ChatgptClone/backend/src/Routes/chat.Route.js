const express = require('express')
const { authUser } = require('../Middleware/authenticateUser')
const { createChat } = require('../Controller/chat.Controller')
const Router = express.Router()


Router.post('/',authUser ,createChat )


module.exports = Router