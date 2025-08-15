const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");

const ProtectedRoutre = (req, res, next) => {
  try {
    const token = req.cookies.Token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    console.log(req.user.id)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = ProtectedRoutre
