const CONSTANTS = require("../../constants");
const placesAPIService = require("../../service/popularity_places_api_service");
const predictionController = require("./ml-model-controller");
const axios = require("axios");

module.exports.getPopularityScore = async (lat, long, starGrade) => {
    let inputFeatures = {};

    // calculating number of same grade hotels within 500m radius
    const sameGradeHotels = await placesAPIService.getSimilarGradeHotels(
        lat,
        long,
        `${starGrade} hotel`
    );
    const sameGradeHotelsCount = sameGradeHotels.length;

    // calculating total reviews count of nearest 20 hotels
    const nearest20Hotels = await placesAPIService.getNearest20Hotels(lat, long);

    let totalReviewsCount = 0;
    nearest20Hotels.forEach((nearHotel) => {
        if(nearHotel.user_ratings_total){
            totalReviewsCount = totalReviewsCount + nearHotel.user_ratings_total;
        }
    });

    // Popularity model
    const model = CONSTANTS.LOCATION_POPULARITY_MODEL;

    inputFeatures = {
        similarHotels: sameGradeHotelsCount,
        neighborhoodReviews: totalReviewsCount,
    };
    console.log("Log [Thanuja, location-popularity-controller -> getPopularityScore] : Input features", inputFeatures);

    return predictionController
        .getPrediction(inputFeatures, model)
        .then((prediction) => {
            popularity_response = {
                sameGradeHotels: sameGradeHotels,
                predictionValue: prediction,
                nearest20Hotels: nearest20Hotels,
                neighborhoodReviews: totalReviewsCount
            }

            console.log(`Log [Thanuja, location-popularity-controller -> getPopularityScore] : Going to pass the response from backend to frontend ${popularity_response}`);
            return popularity_response;
        });
};

module.exports.getSentiment = async (reviewsPara) => {
    let reviews = {
        "reviews": reviewsPara
    }

    return axios({
        method: "post",
        url: `${process.env.FLASK_API_URL}/predict/sentiment`,
        data: reviews,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
        .then(function (response) {
            console.log("Log [Thanuja, sentiment-controller ->  makeRequestToFlaskAPI] : Received response from Flask API", response.data);
            return response.data;
        })
        .catch(function (response) {
            console.error("Error [Thanuja, sentiment-controller ->  makeRequestToFlaskAPI] : Error connecting to Flask API");
        });
}
