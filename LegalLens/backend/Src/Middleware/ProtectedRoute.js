const jwt = require('jsonwebtoken')
const UserModel = require('../Model/User.model')

exports.ProtectedRoute = async(req,res,next) =>{
    try {
        let token;

    // Token from cookies
    if (req.cookies && req.cookies.Token) {
      token = req.cookies.Token;
    }

    // Token from Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
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