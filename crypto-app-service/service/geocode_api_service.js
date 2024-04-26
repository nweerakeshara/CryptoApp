const axios = require("axios");
require("dotenv").config();
const CONSTANTS = require("../constants");

module.exports.geocodeAddress = async (address) => {
  let coordinates = { lat: "", long: "" };

  let baseUrl = CONSTANTS.GEOCODE_URL;
  const API_KEY = process.env.GOOGLE_API_KEY;
  const url = baseUrl + `&address=${address}` + "&key=" + API_KEY;
  console.log(url);

  return axios
    .get(url)
    .then(async (response) => {
      coordinates.lat = response.data.results[0].geometry.location.lat;
      coordinates.long = response.data.results[0].geometry.location.lng;
      console.log(coordinates);
      return coordinates;
    })
    .catch((err) => {
      console.log(err);
    });
};
