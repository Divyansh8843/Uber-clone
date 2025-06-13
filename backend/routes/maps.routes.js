const express = require("express");
const router = express.Router({ mergeParams: true });
const mapController = require("../controllers/maps.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { query } = require("express-validator");
router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be of at least 3 length"),
  authMiddleware.authUser,
  mapController.getCoordinates
);
router.get(
  "/get-distance-time",
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be of at least 3 length"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin must be of at least 3 length"),
  authMiddleware.authUser,
  mapController.gtDistanceTime
);

router.get(
  "/get-suggestions",
  query("input")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be of at least 3 length"),
  authMiddleware.authUser,
  mapController.gtSuggestions
);

module.exports = router;
