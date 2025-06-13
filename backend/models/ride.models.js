const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  pickup: {
    type: String,
    required: true,
    minlength: [3, "pickup address must be at least 3 characters long"],
  },
  destination: {
    type: String,
    required: true,
    minlength: [3, "destination address must be at least 3 characters long"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captainModel",
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
  },
});

const rideModel = mongoose.model("rideModel", rideSchema);
module.exports = rideModel;
