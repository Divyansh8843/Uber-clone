const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rideModel",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
  },
});

const bookingModel = mongoose.model("bookingModel", bookingSchema);

module.exports = bookingModel;
