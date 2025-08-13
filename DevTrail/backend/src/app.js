const express = require('express')
const app = express()
const cors = require("cors");
const ConnectToDb = require('./db/db')
ConnectToDb()
const entryRoutes = require("./Routes/entry.routes")
const authRoutes = require("./Routes/auth.route")
const Cookieparser = require("cookie-parser");


app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(Cookieparser());
app.use("/api/entries", entryRoutes);
app.use('/api/auth', authRoutes)


module.exports = app