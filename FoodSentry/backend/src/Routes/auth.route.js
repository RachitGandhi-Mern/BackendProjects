const express = require('express')
const Router = express.Router()
const ProtectedRoutre = require('../Middleware/authmiddleware')
const {signup, login} = require('../Controllers/authcontroller')



Router.post('/signup',signup)
Router.post('/login',login)



module.exports = Router