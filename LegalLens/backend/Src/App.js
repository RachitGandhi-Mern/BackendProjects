const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const {ConnectTODB} = require('../Src/config/db')


const authRouter = require('./Router/auth.Route')
const fileRoutes = require('./Router/file.Routes')
const analysisRoutes = require('./Router/analysis.Routes')
const { errorHandler, notFound } = require('./Middleware/errorHandler')


ConnectTODB()


app.use(helmet())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 300                
});

app.use('/api/auth',authRouter)
app.use("/api/files", fileRoutes);
app.use("/api/analysis", analysisRoutes);


app.use(limiter);





app.use(notFound);
app.use(errorHandler);


module.exports = app