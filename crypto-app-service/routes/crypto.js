const express = require("express");
const router = express.Router();
const demandController = require("../controller/demand/demand-controller.js");

router.get("/news", async (req, res) => {
  try {
    const province = req.params.time;

    let demandLevel = await demandController.getDemandScore(province);

    res.status(200).json({
      status: "Success",
      data: demandLevel,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
});

module.exports = router;
