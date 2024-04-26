const axios = require("axios");

module.exports.getPrediction = async (inputFeatures, model) => {
  switch (model.toUpperCase()) {
    case "DEMAND":
      let demandPrediction = await makeRequestToFlaskAPI(
        inputFeatures,
        model.toLowerCase()
      );
      return demandPrediction;
    default:
      console.log("No model matches model type" + model);
      throw new Error("Server Error");
  }
};

const makeRequestToFlaskAPI = (inputFeatures, model) => {
  console.log(
    `Sending a request to Flask API at [demand-model-controller ->  makeRequestToFlaskAPI] ${process.env.FLASK_API_URL}/predict/${model}/demand`
  );

  if (inputFeatures.toLowerCase() == "southern province") {
    return axios({
      method: "post",
      url: `${process.env.FLASK_API_URL}/predict/coastal/demand`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (err) {
        console.log("Error connecting to FLASK API");
        if (err) throw new Error("Error connecting to FLASK API");
      });
  } else if (inputFeatures.toLowerCase() == "western province") {
    return axios({
      method: "post",
      url: `${process.env.FLASK_API_URL}/predict/urban/demand`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (err) {
        console.log("Error connecting to FLASK API");
        if (err) throw new Error("Error connecting to FLASK API");
      });
  } else {
    throw new Error("Error connecting to FLASK API");
  }
};
