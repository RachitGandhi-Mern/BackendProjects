const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedpass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedpass,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET , {expiresIn:"7d"});
    res.cookie("Token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await userModel.findOne({ email });
    if (!User) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    const isPassword = await bcrypt.compare(password, User.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET , {expiresIn:"7d"});
    res.cookie("Token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res
      .status(200)
      .json({ message: "User LoggedIn successfully", data: User});
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};
