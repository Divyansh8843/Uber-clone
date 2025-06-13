const userModel = require("../models/user.model");
const rideModel = require("../models/ride.models");
const mapService = require("../services/maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");
// Uber-like fare calculation for auto, car, and motorcycle
module.exports.getFare = async ({ pickup, destination }) => {
  if (!pickup || !destination) {
    throw new Error("Pickup or destination details not provided");
  }

  const data = await mapService.getDistanceAndTime(pickup, destination);
  if (!data || !data.distance || !data.duration) {
    throw new Error("Failed to fetch distance or duration");
  }

  const distanceKm = data.distance.value / 1000;
  const durationMin = data.duration.value / 60;

  const currentHour = new Date().getHours();
  const isNight = currentHour >= 22 || currentHour < 5;

  const fareRates = {
    auto: {
      baseFare: 25,
      perKm: 9,
      perMin: 1,
      minFare: 40,
      bookingFee: 10,
      nightCharge: 10,
      surgeMultiplier: 1.2,
    },
    moto: {
      baseFare: 20,
      perKm: 6,
      perMin: 0.75,
      minFare: 35,
      bookingFee: 5,
      nightCharge: 8,
      surgeMultiplier: 1.1,
    },
    car: {
      baseFare: 45,
      perKm: 14,
      perMin: 2,
      minFare: 60,
      bookingFee: 15,
      nightCharge: 15,
      surgeMultiplier: 1.5,
    },
  };

  const calculateFare = ({
    baseFare,
    perKm,
    perMin,
    minFare,
    bookingFee,
    nightCharge,
    surgeMultiplier,
  }) => {
    let fare = baseFare + distanceKm * perKm + durationMin * perMin;
    fare += bookingFee;
    if (isNight) fare += nightCharge;
    fare *= surgeMultiplier;
    if (fare < minFare) fare = minFare;
    return Number(fare.toFixed(2));
  };

  const fares = {
    auto: calculateFare(fareRates.auto),
    moto: calculateFare(fareRates.moto),
    car: calculateFare(fareRates.car),
  };

  return fares;
};

function getOtp(num) {
  function generateOtp(num) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < num; i++) {
      const idx = crypto.randomInt(0, digits.length);
      otp += digits[idx];
    }
    return otp;
  }
  return generateOtp(num);
}

module.exports.createNewRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
  fare,
}) => {
  try {
    if (!userId || !pickup || !destination || !vehicleType || !fare) {
      throw new Error("Details Not FOund");
    }
    const ride = await rideModel.create({
      user: userId,
      pickup,
      destination,
      fare,
      otp: getOtp(6),
    });
    return ride;
  } catch (err) {
    throw new Error(`Error Occured while Ride created ${err.message}`);
  }
};

module.exports.confirmationRide = async ({ rideId, captain }) => {
  try {
    if (!rideId || !captain) {
      throw new Error("Details Not Found");
    }
    console.log(rideId, captain);
    await rideModel.findByIdAndUpdate(rideId, {
      status: "accepted",
      captain: captain._id,
    });
    const ride = await rideModel
      .findById(rideId)
      .populate("user")
      .populate("captain")
      .select("+otp");
    console.log("ride upadted successfully");
    if (!ride) {
      throw new Error("Ride not found");
    }
    return ride;
  } catch (err) {
    throw new Error(`Error Occured while Ride created ${err.message}`);
  }
};

module.exports.Startride = async ({ rideId, otp, captain }) => {
  try {
    if (!rideId || !otp || !captain) {
      throw new Error("Details Not Found");
    }

    const ride = await rideModel
      .findById(rideId)
      .populate("user")
      .populate("captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Ride Not Found");
    }
    if (ride.status !== "accepted") {
      throw new Error("Ride Not Status");
    }
    console.log("ride start route", rideId, otp, ride.otp);
    if (ride.otp !== otp) {
      throw new Error("Invalid Otp");
    }
    await rideModel.findByIdAndUpdate(rideId, {
      status: "ongoing",
    });
    console.log(" ride status updated to ongoing");
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    return ride;
  } catch (err) {
    throw new Error(`Error Occured while Ride started ${err.message}`);
  }
};

module.exports.FinishRide = async ({ rideId, captain }) => {
  try {
    if (!rideId || !captain) {
      throw new Error("Details not found");
    }
    const ride = await rideModel
      .findOne({
        _id: rideId,
        captain: captain._id,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Ride Not Found");
    }
    if (ride.status !== "ongoing") {
      throw new Error("Ride Not Ongoing");
    }
    await rideModel.findByIdAndUpdate(rideId, {
      status: "completed",
    });
    return ride;
  } catch (err) {
    throw new Error(`Error Occured while Ride Ended ${err.message}`);
  }
};
