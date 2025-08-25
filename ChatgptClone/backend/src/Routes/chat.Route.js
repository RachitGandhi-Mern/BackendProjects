const express = require('express')
const { authUser } = require('../Middleware/authenticateUser')
const { createChat, getChats, getChatMessages } = require('../Controller/chat.Controller')
const Router = express.Router()


Router.post('/',authUser ,createChat )
Router.get('/', authUser, getChats);
Router.get('/:id/messages', authUser, getChatMessages);



module.exports = Router