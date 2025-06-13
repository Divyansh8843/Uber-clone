const express = require("express");
const router = express.Router({ mergeParams: true });
const ridesController = require("../controllers/rides.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { body, query } = require("express-validator");
router.post(
  "/create",
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
    body("vehicleType")
      .isIn(["car", "moto", "auto"])
      .withMessage("Vehicle type must be one of: car, motorcycle, auto"),
  ],
  authMiddleware.authUser,
  ridesController.createRide
);

router.post(
  "/findfare",
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid destination address"),
  ],
  authMiddleware.authUser,
  ridesController.calculateFare
);

router.post(
  "/confirm",
  [body("rideId").isMongoId().withMessage("Invalid ride Id")],
  authMiddleware.authCaptain,
  ridesController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride Id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid Otp"),
  ridesController.startRide
);

router.post(
  "/finish-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride Id"),
  ridesController.finishRide
);

module.exports = router;
