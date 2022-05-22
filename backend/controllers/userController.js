const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const { generatePath } = require("react-router-dom");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { rawListeners } = require("../model/userModel");
//@desc Register a new user
//@route /api/users
//@access Public
const registerUser = asyncHandler(async function (req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all the fields");
  }
  //1.Check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //2.Create password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //3.Create password
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login a user
//@route /api/users
//@access Public

const loginUser = asyncHandler(async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc Get current user
//@route /api/users/me
//@access Private
const getMe = (req, res) => {
  const user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id,
  };
  res.status(200).json(user);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
