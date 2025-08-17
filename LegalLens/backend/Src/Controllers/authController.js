const UserModel = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });

exports.Register = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (![fullname, email, password]) {
    return res
      .status(400)
      .json({ message: "fullname, email, password required" });
  }
  const user = await UserModel.findOne({ email });
  if (user){
    return res.status(409).json({ message: "Email already registered" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    fullname,
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  const token = signToken(newUser._id);
  res.cookie("Token", token);
  res.status(201).json({
    message: "User Registered Succesfully",
    user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email },
    token,
  });
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(user._id);
  res.cookie("Token", token);
  res.status(201).json({
    message: "User LoggedIn Succesfully",
    token,
  });
};


exports.me = (req, res) => {
  res.json({ user: req.user });
};
