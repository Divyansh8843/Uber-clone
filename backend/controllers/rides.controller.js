const ridesService = require("../services/rides.service");
const mapsService = require("../services/maps.service");
const rideModel = require("../models/ride.models");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
module.exports.createRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
      return res.status(404).json({ message: "Details Not Found" });
    }

    const fares = await ridesService.getFare({ pickup, destination });

    const ride = await ridesService.createNewRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
      fare: fares[vehicleType],
    });

    res.status(200).json(ride);

    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    const CaptainsInTheRadius = await mapsService.getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2
    );
    console.log(CaptainsInTheRadius);

    const ridewithUser = await rideModel.findById(ride._id).populate("user");
    console.log(ridewithUser);
    ride.opt = "";
    CaptainsInTheRadius.forEach(async (captain) => {
      console.log(captain);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ridewithUser,
      });
    });
  } catch (err) {
    console.error("Error in createRide:", err); // for debugging
    return res.status(500).json({ message: "Error occurred" });
  }
};

module.exports.calculateFare = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.body;
    if (!pickup || !destination) {
      return res.json({ message: "Details Not Found" }).status(404);
    }
    const fares = await ridesService.getFare({
      pickup,
      destination,
    });
    return res.json(fares).status(200);
  } catch (err) {
    return res.json({ message: err.message }).status(500);
  }
};

module.exports.confirmRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    console.log(rideId);
    if (!rideId) {
      return res.json({ message: "Details Not Found" }).status(404);
    }
    const ride = await ridesService.confirmationRide({
      rideId,
      captain: req.captain,
    });
    res.status(200).json(ride);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirm",
      data: ride,
    });
  } catch (err) {
    return res.json({ message: err.message }).status(500);
  }
};

module.exports.startRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;
    if (!rideId || !otp) {
      return res.json({ message: "Details Not Found" }).status(404);
    }
    const ride = await ridesService.Startride({
      rideId,
      otp,
      captain: req.captain,
    });
    return res.status(200).json(ride);
  } catch (err) {
    return res.json({ error: err.message }).status(500);
  }
};

module.exports.finishRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    if (!rideId) {
      return res.json({ message: "Details Not Found" }).status(404);
    }
    const ride = await ridesService.FinishRide({
      rideId,
      captain: req.captain,
    });
    console.log("ride ended", ride);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    console.log(ride);
    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
