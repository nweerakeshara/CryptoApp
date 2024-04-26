const CONSTANTS = require("../../constants");
const news_service = require("../service/news_service");

module.exports.getCryptoNews = async (req, res) => {
    const { time } = req.query;
    try {
        const data = await news_service.getCryptoNews(time);

        res.status(200).json({
            status: "Success",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            msg: error.message,
        });
    }
};
