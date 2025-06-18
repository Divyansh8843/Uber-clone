const express = require("express");
const router = express.Router({ mergeParams: true });
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { query, body } = require("express-validator");
router.get(
  "/checkout-session",
  authMiddleware.authUser,
  query("rideId").isMongoId().withMessage("Invalid ride Id"),
  paymentController.getCheckoutSession
);

module.exports = router;
