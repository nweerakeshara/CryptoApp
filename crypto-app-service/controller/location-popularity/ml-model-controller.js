const axios = require("axios");
const CONSTANTS = require("../../constants");

module.exports.getPrediction = async (inputFeatures, model) => {
  switch (model.toUpperCase()) {
    case "POPULARITY":
      let prediction = await makeRequestToFlaskAPI(
        inputFeatures,
        model.toLowerCase()
      );
      return prediction;
      break;

    default:
      console.error("Error [Thanuja, ml-model-controller ->  getPrediction] : No model matches model type" + model);
      break;
  }
};

const makeRequestToFlaskAPI = (inputFeatures, model) => {
  console.log(`Log [Thanuja, ml-model-controller ->  makeRequestToFlaskAPI] : Sending a request to Flask API ${process.env.FLASK_API_URL}/predict/${model}/popularity`)

  return axios({
    method: "post",
    url: `${process.env.FLASK_API_URL}/predict/${model}/popularity`,
    data: inputFeatures,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(function (response) {
      console.log("Log [Thanuja, ml-model-controller ->  makeRequestToFlaskAPI] : Received response from Flask API", response.data);
      return response.data;
    })
    .catch(function (response) {
      console.error("Error [Thanuja, ml-model-controller ->  makeRequestToFlaskAPI] : Error connecting to Flask API");
    });
};
