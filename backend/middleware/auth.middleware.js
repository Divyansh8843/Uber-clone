const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access at token in middleware" });
  }
  const isblacklisted = await blacklistTokenModel.findOne({ token });
  if (isblacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized access at blacklisted" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized access at err" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access at token in midleware" });
  }
  const isblacklisted = await blacklistTokenModel.findOne({ token });
  if (isblacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized access at blacklisted" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized access at err" });
  }
};
