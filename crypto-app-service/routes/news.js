const express = require("express");
const router = express.Router();
const news_controller = require("../controller/news_controller");

router.get("/", async (req, res) => {  
  await news_controller.getCryptoNews(req,res);
});

module.exports = router;