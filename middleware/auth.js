const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

// middleware to verify JWT token and authorize the role
exports.authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  // const token = req.headers.authorization
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId);

  if (user.role !== "admin") {
    return res.status(403).json({ message: "You are not authorized" });
  }

  req.user = user;

  next();
};
