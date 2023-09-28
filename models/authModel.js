const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required:[true,"Please Enter Your Name"],
    },
    email: {
      type: String,
      required:[true,"Please Enter Your Email"],
      unique: true,
      validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password: {
      type: String,
      required:[true,"Please Enter Your Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
