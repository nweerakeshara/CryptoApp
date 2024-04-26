const CONSTANTS = require("../../constants");
const distanceAPIService = require("../../service/distance_api_service");
const placesAPIService = require("../../service/places_api_service");
const predictionController = require("./prediction_controller");
const geoDBCitiesService = require("../../service/geo_db_cities");

module.exports.getAttractionScore = async (
    lat,
    long,
    beachType,
    privateBeach,
    starGrade,
    cityA,
    cityCenterA,
    provinceA
) => {
    // let locationDetails = await geoDBCitiesService.getCityProvince(lat, long);

    let city = cityA.toLowerCase();
    let cityCenter = cityCenterA;
    let province = provinceA;

    const attrDistances = await distanceAPIService.getDurationToAttractions(
        lat,
        long,
        city
    );
    const attraction1 = attrDistances[0];
    const attraction2 = attrDistances[1];
    let inputFeatures = {};

    if (isCoastal(province)) {
        const coastalPlaces = await placesAPIService.getCoastalPlaces(lat, long);

        const restaurants = coastalPlaces.restaurants.length;
        const cafes = coastalPlaces.cafes.length;
        const atms = coastalPlaces.atms.length;
        const model = CONSTANTS.MODELS[0]; // Coastal model
        inputFeatures = {
            starGrade,
            cityCenter,
            privateBeach,
            beachType,
            lat,
            long,
            restaurants,
            cafes,
            atms,
            attraction1,
            attraction2,
        };
        console.log("---------------------------");
        console.log("ATTRACTION INPUT FEATURES");
        console.log(inputFeatures);

        return predictionController
            .getPrediction(inputFeatures, model)
            .then((prediction) => {
                attraction_response = {
                    scoreCard: prediction.scoreCard,
                    rating: prediction.rating,
                    restaurants: inputFeatures.restaurants,
                    cafes: inputFeatures.cafes,
                    atms: inputFeatures.atms,
                    cityCenter: inputFeatures.cityCenter,
                    coastalPlaces: coastalPlaces
                };

                console.log(attraction_response);
                console.log("ATTRACTION PREDICTION");
                console.log(prediction);
                return attraction_response;
            });
    } else {
        return new Error("No model matches given city");
    }
};

const isCoastal = (province) => {
    return CONSTANTS.COASTAL_PROVINCE.includes(province.toLowerCase());
};
