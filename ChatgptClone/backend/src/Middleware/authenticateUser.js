const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model");

exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.Token;

    if (!token) {
      return res.status(400).json("Unautharised");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message, error });

  }
};
