const userModel = require("../models/user.model");
const rideModel = require("../models/ride.models");
const captainModel = require("../models/captain.model");
const { Stripe } = require("stripe");
const bookingModel = require("../models/booking.model");
const { sendMessageToSocketId } = require("../socket");
const { validationResult } = require("express-validator");

module.exports.getCheckoutSession = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.query;
    const ride = await rideModel
      .findById(rideId)
      .populate("user")
      .populate("captain");
    if (!ride) {
      return res.status(404).json({ message: "Ride Not Found" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      customer_email: req.user.email,
      client_reference_id: ride.captain._id.toString(),
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: Math.round(ride.fare * 100),
            product_data: {
              name:
                ride.captain.fullname.firstname +
                " " +
                ride.captain.fullname.lastname,
              description:
                "book ride from " + ride.pickup + " to " + ride.destination,
            },
          },
          quantity: 1,
        },
      ],
    });
    //  console.log(session);
    const booking = new bookingModel({
      ride: ride._id,
      user: req.user._id,
      ticketPrice: ride.fare,
      session: session.id,
    });
    //   console.log(booking);
    res.status(200).json({ message: "Successfully paid", session });
    await booking.save();
    //console.log(session);
    sendMessageToSocketId(ride.captain.socketId, {
      event: "confirm-payment",
      data: session,
    });
    console.log("message send at payment route");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
