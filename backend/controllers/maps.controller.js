const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
module.exports.getCoordinates = async (req, res) => {
  try {
    const { address } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!address) {
      return res.json({ message: "Address Not found" }).status(404);
    }
    const coordinates = await mapService.getAddressCoordinate(address);
    return res.json(coordinates).status(200);
  } catch (err) {
    return res.json({ message: "Coordinates Not Found" }).status(404);
  }
};

module.exports.gtDistanceTime = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!origin || !destination) {
      return res.json({ message: "Details Not Found" }).status(404);
    }
    const distancetime = await mapService.getDistanceAndTime(
      origin,
      destination
    );
    return res.json(distancetime).status(200);
  } catch (err) {
    return res.json({ message: "Distance Not Found" }).status(404);
  }
};

module.exports.gtSuggestions = async (req, res) => {
  try {
    const { input } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!input) {
      return res.json({ message: "query not Found" }).status(404);
    }
    const suggestions = await mapService.getAutoSuggestion(input);
    return res.json(suggestions).status(200);
  } catch (err) {
    return res.json({ message: "Distance Not Found" }).status(404);
  }
};
