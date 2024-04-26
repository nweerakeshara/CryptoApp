const CONSTANTS = require("../../constants");
const demandPredictionController = require("./demand-model-controller");
const geoDBCitiesService = require("../../service/geo_db_cities");

module.exports.getDemandScore = async (province) => {
  const model = CONSTANTS.DEMAND_MODEL;
    console.log(province);
  return demandPredictionController
    .getPrediction(province, model)
    .then((prediction) => {
      return prediction;
    });
};
