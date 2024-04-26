const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

module.exports.getCryptos = async (count) => {
  const baseUrl = CONSTANTS.COIN_RANKING_BASE_URL;

  const options = {
    method: CONSTANTS.AXIOS_GET,
    url: `${baseUrl}/coins`,
    params: {
      limit: count
    },
    headers: {
      'X-RapidAPI-Key': process.env.COIN_RANKING_API_KEY,
      'X-RapidAPI-Host': process.env.COIN_RANKING_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getCryptoDetails = async (coinId) => {
  const baseUrl = CONSTANTS.COIN_RANKING_BASE_URL;

  const options = {
    method: CONSTANTS.AXIOS_GET,
    url: `${baseUrl}/coin/${coinId}`,
    headers: {
      'X-RapidAPI-Key': process.env.COIN_RANKING_API_KEY,
      'X-RapidAPI-Host': process.env.COIN_RANKING_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getNewBestCryptos = async () => {
  const baseUrl = CONSTANTS.PLACES_URL;

  const options = {
    method: CONSTANTS.AXIOS_GET,
    url: `${baseUrl}/stats`,
    headers: {
      'X-RapidAPI-Key': process.env.COIN_RANKING_API_KEY,
      'X-RapidAPI-Host': process.env.COIN_RANKING_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getCryptoHistory = async (coinId,timePeriod) => {
  const baseUrl = CONSTANTS.PLACES_URL;
  const defaultTimePeriod = CONSTANTS.COIN_RANKING_CRYPTO_HISTORY_TIME_PERIOD;

  const options = {
    method: CONSTANTS.AXIOS_GET,
    url: `${baseUrl}/coin/${coinId}/history`,
    params: {
      timePeriod: timePeriod || defaultTimePeriod
    },
    headers: {
      'X-RapidAPI-Key': process.env.COIN_RANKING_API_KEY,
      'X-RapidAPI-Host': process.env.COIN_RANKING_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.log(error);
  }
};