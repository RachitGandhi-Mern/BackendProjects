const userModel = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("Token", token,{
      httpOnly: true,
      secure: true,          
  sameSite: "none",     
  maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ messgae: "User Registed Succesfully" });
    console.log(newUser);
  } catch (error) {
    console.log(`The error is ${error}`);
    res.status(500).json(error.message, error);
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Credential" });
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(401).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,          
  sameSite: "none",     
  maxAge: 7 * 24 * 60 * 60 * 1000,

});
const safeUser = { _id: user._id, email: user.email, fullname: user.fullname };
res.status(200).json({ message: "User LoggedIn Successfully", user: safeUser });
    console.log("User LoggedIn Succesfully")
  } catch (error) {
     console.log(`The error is ${error}`);
    res.status(500).json(error.message, error);
  }
};


