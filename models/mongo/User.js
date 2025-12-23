const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Missing username"],
    trim: true,
    minlength: [1, "Username cannot be empty"],
  },
  password: {
    type: String,
    required: [true, "Missing password"],
    trim: true,
    minlength: [1, "password cannot be empty"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// https://programming-lab-pdf-to-audio-server.onrender.com/api/v1/auth/signup
