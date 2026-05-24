const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    default: "student",
  },

  status: {
    type: String,
    enum: ["available", "busy", "offline"],
    default: "offline",
  },

  department: {
    type: String,
    default: "Computer Engineering",
  },

  room: {
    type: String,
    default: "Room 101",
  },

  block: {
    type: String,
    default: "Admin Block",
  },

});

module.exports = mongoose.model("User", userSchema);