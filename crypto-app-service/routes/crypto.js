const express = require("express");
const router = express.Router();
const crypto_controller = require("../controller/crypto_controller.js");

router.get("/", async (req, res) => {  
  await crypto_controller.getCryptos(req,res);
});

router.get("/details", async (req, res) => {  
  await crypto_controller.getCryptoDetails(req,res);
});

router.get("/stats", async (req, res) => {  
  await crypto_controller.getNewBestCryptos(req,res);
});

router.get("/history", async (req, res) => {  
  await crypto_controller.getCryptoHistory(req,res);
});

module.exports = router;
