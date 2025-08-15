const express = require('express')
const app = express()
const cors = require("cors")
const cookie = require('cookie-parser')
const connectDB = require('./config/db')
const authRouter = require('./Routes/auth.route')


connectDB()


app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json())
app.use(cookie())





app.use('/api/auth',authRouter)


module.exports = app