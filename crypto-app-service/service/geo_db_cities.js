const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

module.exports.getCityProvince = async (lat, long) => {
  let locationDetails = await getLocationDetails(lat, long);
  return locationDetails;
};

const getLocationDetails = async (lat, long) => {
  let API_KEY = process.env.GEO_DB_CITIES_API_KEY;
  let requestUrl = {
    method: "GET",
    url:
      "https://wft-geo-db.p.rapidapi.com/v1/geo/locations/+" +
      lat +
      "+" +
      long +
      "/nearbyCities",
    params: {
      radius: "100",
      limit: "1",
      minPopulation: "1",
      types: "CITY",
      distanceUnit: "KM",
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  return axios
    .request(requestUrl)
    .then(function (response) {
      const coordinateDetails = {
        city: response.data.data[0].city,
        cityCenter: response.data.data[0].distance,
        province: response.data.data[0].region,
      };
      return coordinateDetails;
    })
    .catch(function (error) {
      throw new Error("Error fetching location details");
    });
};
