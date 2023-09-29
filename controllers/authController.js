const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password:hashedPassword,
      role,
    });

    if (!user) {
      return res.status(500).json({
        message: "Authentication Failed please login",
      });
    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyPattern.email) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.error("MongoDB Error:", error.message);
      res.status(500).json({ message: "Internal Server error"});
    }
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({email});
      if (!user) {
        return res.status(500).json({
          message: "email & password are not correct",
        });
      }
      const validPassword = await bcrypt.compare(password,user.password)
      if(!validPassword){
        return res.status(401).json({ error: "Password is Wrong" });
      }

      const token = jwt.sign({userId:user._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      })
      res.status(201).cookie("token", token).json({
        message: "Login successfully",
        token,
      });
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        res.status(500).json({ message: "Login Failed" });
      
    }
  };
  
  exports.logout= async(req,res)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
      });
  
    res.status(200).json({
      message: "Log out Successfully",
    });
  
  }