const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};

module.exports.findUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const user = await userModel.findOne({ email }).select("+password");
  return user;
};
