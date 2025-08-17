const jwt = require('jsonwebtoken')
const UserModel = require('../Model/User.model')

exports.ProtectedRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.Token
    if(!token){
        return res.status(401).json({message:"Unauthrised"})
    }
    const decoded =  jwt.verify(token , process.env.JWT_SECRET)
    const user = await UserModel.findById(decoded.id).select('-password')
    if(!user){
        return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}