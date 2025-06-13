const axios = require("axios");
const captainModel = require("../models/captain.model");
module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const response = await axios.get(url, {
      params: {
        address,
        key: apiKey,
      },
    });
    if (
      response.data.status === "OK" &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to find coordinates for the given address.");
    }
  } catch (error) {
    throw new Error(`Error fetching coordinates:  ${error.message}`);
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error("Details Not Found");
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
    const response = await axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey,
      },
    });

    if (
      response.data.status === "OK" &&
      response.data.rows &&
      response.data.rows.length > 0 &&
      response.data.rows[0].elements &&
      response.data.rows[0].elements.length > 0 &&
      response.data.rows[0].elements[0].status === "OK"
    ) {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance,
        duration: element.duration,
      };
    } else {
      throw new Error(
        "Unable to find distance and time for the given addresses."
      );
    }
  } catch (error) {
    throw new Error(`Error fetching distance and time: ${error.message}`);
  }
};

module.exports.getAutoSuggestion = async (input) => {
  try {
    if (!input) {
      throw new Error("query is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const response = await axios.get(url, {
      params: {
        input,
        key: apiKey,
      },
    });
    if (
      response.data.status === "OK" &&
      response.data.predictions &&
      response.data.predictions.length > 0
    ) {
      return response.data.predictions.map((prediction) => ({
        description: prediction.description,
        place_id: prediction.place_id,
      }));
    } else {
      throw new Error("Unable to find Suggestions for the given input.");
    }
  } catch (err) {
    throw new Error(`Error fetching Suggestions: ${err.message}`);
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km
  console.log(ltd, lng);
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  console.log("function run");
  return captains;
};
