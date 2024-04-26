const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

module.exports.getCryptoNews = async (time) => {  
  const baseUrl = CONSTANTS.NEWS_BASE_URL;
  const defaultTerm = CONSTANTS.NEWS_TERM;
  const defaultSafeSearch = CONSTANTS.NEWS_SAFE_SEARCH;
  const defaultRegion = CONSTANTS.NEWS_REGION;
  const defaultTime = CONSTANTS.NEWS_TIME;

  const options = {
    method: CONSTANTS.AXIOS_GET,
    url: baseUrl,
    params: {
      term: defaultTerm,
      safeSearch: defaultSafeSearch,
      time: time || defaultTime,
      region: defaultRegion
    },
    headers: {
      'X-RapidAPI-Key': process.env.DUCK_DUCK_GO_API_KEY,
      'X-RapidAPI-Host': process.env.DUCK_DUCK_GO_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};
