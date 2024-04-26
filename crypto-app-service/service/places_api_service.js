const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

module.exports.getCoastalPlaces = async (lat, long) => {
  let restaurants = [];
  let cafes = [];
  let atms = [];

  restaurants = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_RESTAURANT,
    500,
    "",
    restaurants
  );
  cafes = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_CAFE,
    500,
    "",
    cafes
  );
  atms = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_ATM,
    500,
    "",
    atms
  );

  const coastalPlaces = {
    restaurants: restaurants,
    cafes: cafes,
    atms: atms,
  };

  return coastalPlaces;
};

const getPlacesByType = (lat, long, type, radius, nextPageToken, places) => {
  let baseUrl = CONSTANTS.PLACES_URL;
  const searchRadius = radius;
  const language = "en";
  const API_KEY = process.env.GOOGLE_API_KEY;
  const placeType = type;
  const coordinates = `${lat},${long}`;

  let firstURL =
    baseUrl +
    "&location=" +
    coordinates +
    "&radius=" +
    searchRadius +
    "&type=" +
    placeType +
    "&language=" +
    language +
    "&key=" +
    API_KEY;

  let nextURL =
    baseUrl +
    "&location=" +
    coordinates +
    "&radius=" +
    searchRadius +
    "&type=" +
    placeType +
    "&language=" +
    language +
    "&key=" +
    API_KEY +
    "&pagetoken=" +
    nextPageToken;

  let url = nextPageToken === "" ? firstURL : nextURL;

  return axios
    .get(url)
    .then(async (response) => {
      let newPlaces = [...places, ...response.data.results];

      if (response.data.next_page_token !== undefined) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return getPlacesByType(
          lat,
          long,
          type,
          radius,
          response.data.next_page_token,
          newPlaces
        );
      }
      return newPlaces;
    })
    .catch((err) => {
      console.log(err);
    });
};
