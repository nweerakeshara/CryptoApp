const axios = require("axios");
const CONSTANTS = require("../../constants");

module.exports.getPrediction = async (inputFeatures, model) => {
  switch (model.toUpperCase()) {
    case "COASTAL":
      let prediction = await makeRequestToFlaskAPI(
        inputFeatures,
        model.toLowerCase()
      );
      return prediction;
      break;

    default:
      console.log("No model matches model type" + model);
      break;
  }
};

const makeRequestToFlaskAPI = (inputFeatures, model) => {
  return axios({
    method: "post",
    url: `${process.env.FLASK_API_URL}/predict/${model}/accessibility`,
    data: inputFeatures,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data);
      return response.data;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      console.log("Error connecting to FLASK API");
    });
};
