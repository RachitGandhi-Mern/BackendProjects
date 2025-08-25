const express = require('express')
const Router = express.Router()
const { Register, Login } = require('../Controller/auth.Controller')
const { authUser } = require('../Middleware/authenticateUser')


Router.post('/register',Register)
Router.post('/login',Login)
Router.get("/check", authUser, (req, res) => {
  res.json({ user: req.user });
});

Router.get("/me", authUser, (req, res) => {
  return res.json(req.user);
});



module.exports = Router