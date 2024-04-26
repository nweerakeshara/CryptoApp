const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

module.exports.getPlaces = async (lat, long) => {
  let airport = [];
  let busStation = [];
  let carRental = [];
  let lightRailStation = [];
  let parking = [];
  let rvPark = [];
  let subwayStation = [];
  let taxiStand = [];
  let trainStation = [];
  let transitStation = [];
  let travelAgency = [];
  let gasStation = [];

  airport = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_AIRPORT,
    1000,
    "",
    airport
  );
  busStation = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_BUS_STATION,
    1000,
    "",
    busStation
  );
  carRental = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_CAR_RENTAL,
    1000,
    "",
    carRental
  );
  lightRailStation = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_LIGHT_RAIL_STATION,
    1000,
    "",
    lightRailStation
  );
  parking = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_PARKING,
    1000,
    "",
    parking
  );
  rvPark = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_RV_PARK,
    1000,
    "",
    rvPark
  );
  subwayStation = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_SUBWAY_STATION,
    1000,
    "",
    subwayStation
  );
  taxiStand = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_TAXI_STAND,
    1000,
    "",
    taxiStand
  );
  trainStation = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_TRAIN_STATION,
    1000,
    "",
    trainStation
  );
  transitStation = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_TRANSIT_STATION,
    1000,
    "",
    transitStation
  );
  travelAgency = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_TRAVEL_AGENCY,
    1000,
    "",
    travelAgency
  );
  gasStation = await getPlacesByType(
    lat,
    long,
    CONSTANTS.PLACE_TYPE_GAS_STATION,
    1000,
    "",
    gasStation
  );

  const coastalPlaces = {
    airport: airport,
    busStation: busStation,
    carRental: carRental,
    lightRailStation: lightRailStation,
    parking: parking,
    rvPark: rvPark,
    subwayStation: subwayStation,
    taxiStand: taxiStand,
    trainStation: trainStation,
    transitStation: transitStation,
    travelAgency: travelAgency,
    gasStation: gasStation,
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
