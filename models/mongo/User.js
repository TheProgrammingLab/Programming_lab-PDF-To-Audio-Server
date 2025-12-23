const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Missing email"],
    minlength: [1, "email cannot be empty"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Missing password"],
    trim: true,
    minlength: [1, "password cannot be empty"],
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// https://programming-lab-pdf-to-audio-server.onrender.com/api/v1/auth/signup
