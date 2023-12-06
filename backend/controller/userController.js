const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("user already exists");
  }

  //Hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (createUser) {
    res.status(201).json({
      _id: createUser.id,
      name: createUser.name,
      email: createUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check for password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("password doesnt match");
  }

  res.json({ message: "Login user" });
});

const getMe = asyncHandler(async (req, res) => {
  console.log("able to access the data");
  res.json({ message: "Get Me" });
});

module.exports = { registerUser, loginUser, getMe };
