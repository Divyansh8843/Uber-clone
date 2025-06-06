const captainModel = require("../models/captain.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");
module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
      return res
        .status(400)
        .json({ message: "Captain with this email already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    if (!hashedPassword) {
      return res.json({ message: "hash password not found" }).status(404);
    }
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      vehicleColor: vehicle.color,
      vehiclePlate: vehicle.plate,
      vehicletype: vehicle.vehicleType,
      vehicleCapacity: vehicle.capacity,
    });
    const token = await captain.GenerateAuthToken();
    if (!token) {
      return res.json({ message: "Token not generated" }).status(404);
    }
    // user.token = token;
    // await user.save();
    return res.status(200).json({ captain, token });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Error occured", error: err.message });
  }
};

module.exports.signinCaptain = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const captain = await captainService.findCaptain({ email, password });
    if (!captain) {
      return res.json({ message: "Invalid Email or Password" }).status(401);
    }
    const result = captain.comparePassword(password);
    if (!result) {
      return res.json({ message: "Invalid Email or Password" }).status(404);
    }
    const token = await captain.GenerateAuthToken();
    if (!token) {
      return res.json({ message: "Token not generated" }).status(404);
    }
    res.cookie("token", token);
    return res.json({ captain, token }).status(200);
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Error occured", error: err.message });
  }
};

module.exports.captainLogout = async (req, res, next) => {
  const token = req.cookies.token || req.header.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access at token in controller" });
  }
  await blacklistModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out Sucesssfully" });
};

module.exports.captainProfile = async (req, res, next) => {
  try {
    return res.status(200).json(req.captain);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
