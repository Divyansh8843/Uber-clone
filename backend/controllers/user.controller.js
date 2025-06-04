const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
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
    const token = await userModel.GenerateAuthToken;
    user.token = token;
    await user.save();
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(`Error occured  ${err}`);
  }
};

module.exports.signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Data not found" }).status(404);
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" }).status(404);
    }
    const result = await userModel.comparePassword(password);
    if (!result) {
      return res.json({ message: "Password not matched" }).status(404);
    }
    return res.json(
      { message: "User signed in successfully", user: user },
      (status = 200)
    );
  } catch (err) {
    console.log(`Error occurred: ${err}`);
    return res.json({ message: "Internal server error" }).status(404);
  }
};
