const asyncHandler = require("express-async-handler");
const registerUser = asyncHandler((req, res) => {
  console.log("able to access the data");
  res.json({ message: "Register user" });
});

const loginUser = asyncHandler((req, res) => {
  res.json({ message: "Login user" });
});

const getMe = asyncHandler((req, res) => {
  console.log("able to access the data");
  res.json({ message: "Get Me" });
});

module.exports = { registerUser, loginUser, getMe };
