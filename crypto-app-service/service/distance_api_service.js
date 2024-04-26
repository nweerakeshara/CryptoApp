const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

module.exports.getDurationToAttractions = async (lat, long, city) => {
  let origin = "";
  let dest1 = "";
  let dest2 = "";
  switch (city.toLowerCase()) {
    case "galle":
      origin = `${lat},${long}`;
      dest1 = CONSTANTS.GALLE_ATTRACTION_1;
      dest2 = CONSTANTS.GALLE_ATTRACTION_2;
      attraction1 = await getDuration(origin, dest1);
      attraction2 = await getDuration(origin, dest2);

      return [attraction1, attraction2];
      break;
    case "hikkaduwa":
      origin = `${lat},${long}`;
      dest1 = CONSTANTS.HIKKADUWA_ATTRACTION_1;
      dest2 = CONSTANTS.HIKKADUWA_ATTRACTION_2;
      attraction1 = await getDuration(origin, dest1);
      attraction2 = await getDuration(origin, dest2);

      return [attraction1, attraction2];
      break;

    default:
      attraction1 = 0;
      attraction2 = 0;
      console.log("ERROR: City not yet included in distance_api_service(), City is " + city);
      return [attraction1, attraction2];
      break;
  }
};

const getDuration = async (origin, destination) => {
  let url = CONSTANTS.DISTANCE_URL;
  let units = "metric";
  let originPoint = origin;
  let destinationPoint = destination;
  let API_KEY = process.env.GOOGLE_API_KEY;

  let requestUrl =
    url +
    "origin=" +
    originPoint +
    "&destination=" +
    destinationPoint +
    "&units=" +
    units +
    "&key=" +
    API_KEY;

  return axios
    .get(requestUrl)
    .then(function (response) {
      let duration = response.data.routes[0].legs[0].duration.value;

      return duration;
    })
    .catch(function (error) {
      console.log(error);
    });
};
