const CONSTANTS = require("../constants");
const axios = require("axios");
require("dotenv").config();

// retrieve same grade hotels within 500m radius
module.exports.getSimilarGradeHotels = async (lat, long, keyword) => {
    let sameGradeHotels = [];

    sameGradeHotels = await sendNearbySearchRequest(
        lat,
        long,
        keyword,
        500,
        "",
        sameGradeHotels
    );

    return sameGradeHotels;
};

// retrieve nearest 20 hotels
module.exports.getNearest20Hotels = async (lat, long) => {
    let nearest20Hotels = [];
    let nearest20HotelsFullDetails;

    nearest20Hotels = await sendNearbySearchRequestRankByDistance(
        lat,
        long,
        "hotel",
        nearest20Hotels
    );

    //getting full details of the places
    nearest20HotelsFullDetails = await getFullPlaceDetails(nearest20Hotels);

    return nearest20HotelsFullDetails;
};

// returns array of same grade hotels within 500m radius
const sendNearbySearchRequest = (
    lat,
    long,
    keyword,
    radius,
    nextPageToken,
    places
) => {
    let baseUrl = CONSTANTS.PLACES_URL;
    const searchRadius = radius;
    const language = "en";
    const API_KEY = process.env.GOOGLE_API_KEY;
    const placeKeyword = keyword;
    const coordinates = `${lat},${long}`;

    let firstURL =
        baseUrl +
        "&location=" +
        coordinates +
        "&radius=" +
        searchRadius +
        "&keyword=" +
        placeKeyword +
        "&language=" +
        language +
        "&key=" +
        API_KEY;

    let nextURL =
        baseUrl +
        "&location=" +
        coordinates +
        "&radius=" +
        searchRadius +
        "&keyword=" +
        placeKeyword +
        "&language=" +
        language +
        "&key=" +
        API_KEY +
        "&pagetoken=" +
        nextPageToken;

    let url = nextPageToken === "" ? firstURL : nextURL;

    return axios
        .get(url)
        .then(async (response) => {
            let newPlaces = [...places, ...response.data.results];

            if (response.data.next_page_token !== undefined) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return sendNearbySearchRequest(
                    lat,
                    long,
                    keyword,
                    radius,
                    response.data.next_page_token,
                    newPlaces
                );
            }
            return newPlaces;
        })
        .catch((err) => {
            console.log(err);
        });
};

// returns array of nearest 20 hotels
const sendNearbySearchRequestRankByDistance = (lat, long, keyword, places) => {
    let baseUrl = CONSTANTS.PLACES_URL;
    const language = "en";
    const API_KEY = process.env.GOOGLE_API_KEY;
    const placeKeyword = keyword;
    const coordinates = `${lat},${long}`;

    let firstURL =
        baseUrl +
        "&location=" +
        coordinates +
        "&rankby=distance&keyword=" +
        placeKeyword +
        "&language=" +
        language +
        "&key=" +
        API_KEY;

    let url = firstURL;

    return axios
        .get(url)
        .then(async (response) => {
            let newPlaces = [...places, ...response.data.results];

            return newPlaces;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getFullPlaceDetails = async (placesArray) => {
    const promises = placesArray.map(async (item, index) => {
        let response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${process.env.GOOGLE_API_KEY}`);
        return response.data.result;
    })

    const allResults = await Promise.all(promises);

    return allResults;
}
