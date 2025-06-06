const captainModel = require("../models/captain.model");

module.exports.createCaptain = async function ({
  firstname,
  lastname,
  email,
  password,
  vehicleColor,
  vehiclePlate,
  vehicletype,
  vehicleCapacity,
}) {
  if (
    !firstname ||
    !email ||
    !password ||
    !vehicleColor ||
    !vehiclePlate ||
    !vehicletype ||
    !vehicleCapacity
  ) {
    throw new Error("All fields are required");
  }
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicleColor,
      plate: vehiclePlate,
      vehicleType: vehicletype,
      capacity: vehicleCapacity,
    },
  });
  return captain;
};

module.exports.findCaptain = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const captain = await captainModel.findOne({ email }).select("+password");
  return captain;
};
