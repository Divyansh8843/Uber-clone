const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistModel = require("../models/blacklistToken.model");
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const hashedPassword = await userModel.hashPassword(password);
    if (!hashedPassword) {
      return res.json({ message: "hash password not found" }).status(404);
    }

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
    const token = await user.GenerateAuthToken();
    if (!token) {
      return res.json({ message: "Token not generated" }).status(404);
    }
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUser({ email, password });
    if (!user) {
      return res.json({ message: "Invalid Email or Password" }).status(401);
    }
    const result = user.comparePassword(password);
    if (!result) {
      return res.json({ message: "Invalid Email or Password" }).status(404);
    }
    const token = await user.GenerateAuthToken();
    if (!token) {
      return res.json({ message: "Token not generated" }).status(404);
    }
    res.cookie("token", token);
    return res.json({ user, token }).status(201);
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    return res.json({ message: "Internal server error" }).status(404);
  }
};

module.exports.userLogout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access at token in controller" });
  }
  await blacklistModel.create({ token });
  res.clearCookie("token");
  return res.status(201).json({ message: "Logged out Sucesssfully" });
};

module.exports.userProfile = async (req, res, next) => {
  return res.status(201).json(req.user);
};
