const CONSTANTS = require("../constants");
const crypto_service = require("../service/crypto_service");

module.exports.getCryptos = async (req, res) => {
    const { count } = req.query;
    try {
        const data = await crypto_service.getCryptos(count);

        res.status(200).json({
            status: "Success",
            data: data.data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            msg: error.message,
        });
    }
};

module.exports.getCryptoDetails = async (req, res) => {
    const { coinId } = req.query;
    try {
        const data = await crypto_service.getCryptoDetails(coinId);

        res.status(200).json({
            status: "Success",
            data: data.data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            msg: error.message,
        });
    }
};

module.exports.getNewBestCryptos = async (req, res) => {
    
    try {
        const data = await crypto_service.getNewBestCryptos();

        res.status(200).json({
            status: "Success",
            data: data.data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            msg: error.message,
        });
    }
};

module.exports.getCryptoHistory = async (req, res) => {
    const { coinId } = req.query;
    const { timePeriod } = req.query;
    try {
        const data = await crypto_service.getCryptoHistory(coinId,timePeriod);

        res.status(200).json({
            status: "Success",
            data: data.data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            msg: error.message,
        });
    }
};