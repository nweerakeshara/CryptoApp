const CONSTANTS = require("../../constants");
const accessibilityPlacesAPIService = require("../../service/accessibility_places_api_service");
const geoDBCitiesService = require("../../service/geo_db_cities");
const predictionController = require("./prediction_controller");

module.exports.getAccessibilityScore = async (
    lat,
    long,
    taxi,
    airportShuttle,
    WheelChair,
    starGrade,
    cityA,
    cityCenterA,
    provinceA
) => {

    let inputFeatures = {};
    // let locationDetails = await geoDBCitiesService.getCityProvince(lat, long);

    let cityCenter = cityCenterA;

    if (isCoastal(provinceA)) {
        const accessibilityPlaces = await accessibilityPlacesAPIService.getPlaces(
            lat,
            long
        );

        const airport = accessibilityPlaces.airport.length;
        const busStation = accessibilityPlaces.busStation.length;
        const carRental = accessibilityPlaces.carRental.length;
        const lightRailStation = accessibilityPlaces.lightRailStation.length;
        const parking = accessibilityPlaces.parking.length;
        const rvPark = accessibilityPlaces.rvPark.length;
        const subwayStation = accessibilityPlaces.subwayStation.length;
        const taxiStand = accessibilityPlaces.taxiStand.length;
        const trainStation = accessibilityPlaces.trainStation.length;
        const transitStation = accessibilityPlaces.transitStation.length;
        const travelAgency = accessibilityPlaces.travelAgency.length;
        const gasStation = accessibilityPlaces.gasStation.length;
        const model = CONSTANTS.MODELS[0]; // Coastal model
        inputFeatures = {
            lat,
            long,
            starGrade,
            cityCenter,
            taxi,
            airportShuttle,
            WheelChair,
            airport,
            busStation,
            carRental,
            lightRailStation,
            parking,
            rvPark,
            subwayStation,
            taxiStand,
            trainStation,
            transitStation,
            travelAgency,
            gasStation,
        };
        console.log(inputFeatures);

        return predictionController
            .getPrediction(inputFeatures, model)
            .then((prediction) => {
                let hubs =
                    Number(inputFeatures.airport) +
                    Number(inputFeatures.busStation) +
                    Number(inputFeatures.carRental) +
                    Number(inputFeatures.lightRailStation) +
                    Number(inputFeatures.subwayStation) +
                    Number(inputFeatures.taxiStand) +
                    Number(inputFeatures.trainStation) +
                    Number(inputFeatures.transitStation);
                let response = {
                    score: prediction.score,
                    rating: prediction.rating,
                    transportHubs: hubs,
                    parking: inputFeatures.parking,
                    gasStation: inputFeatures.gasStation,
                    cityCenter: inputFeatures.cityCenter,
                    locations: accessibilityPlaces
                };
                console.log("ACCESSIBILITY RESPONSE");
                console.log(response);
                return response;
            });
    } else {
        return new Error("No model matches given Location");
    }
};

const isCoastal = (province) => {
    return CONSTANTS.COASTAL_PROVINCE.includes(province.toLowerCase());
};
