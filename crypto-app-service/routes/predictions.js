const express = require("express");
const router = express.Router();
const attractionController = require("../controller/attraction/attraction_controller");
const accessibilityController = require("../controller/accessibility/accessibility_controller");
const popularityController = require("../controller/location-popularity/location-popularity-controller");
const demandController = require("../controller/demand/demand-controller");
const qnaContoller = require("../controller/qna/qna_controller.js");
const Feature = require("../model/feature");
// Home
router.get("/", (req, res) => {
  res.send(`Server running on ${process.env.PORT || 3000}`);
});

router.get("/test", (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
  const beachType = req.query.beachAccess;
  const privateBeach = req.query.privateBeach;
  const starGrade = req.query.starGrade;

  console.log(lat);
  console.log(long);
  console.log(beachType);
  console.log(privateBeach);
  console.log(starGrade);

  setTimeout(() => res.send({ rating: 9.1, score: 45 }), 2000);
});

router.get("/attraction", async (req, res) => {
  console.log("Recieved ATTRACTION request.....");
  const lat = req.query.lat;
  const long = req.query.long;
  const beachType = req.query.beachAccess;
  const privateBeach = req.query.privateBeach;
  const starGrade = req.query.starGrade;
  const city = req.query.city;
  const cityCenter = req.query.cityCenter;
  const province = req.query.province;

  let score = await attractionController.getAttractionScore(
    lat,
    long,
    beachType,
    privateBeach,
    starGrade,
    city,
    cityCenter,
    province
  );
  res.send(JSON.stringify(score));
});

router.get("/accessibility", async (req, res) => {
  try {
    const lat = req.query.lat;
    const long = req.query.long;
    const taxi = req.query.taxi;
    const airportShuttle = req.query.airportShuttle;
    const wheelChair = req.query.wheelChair;
    const starGrade = req.query.starGrade;
    const city = req.query.city;
    const cityCenter = req.query.cityCenter;
    const province = req.query.province;

    let score = await accessibilityController.getAccessibilityScore(
      lat,
      long,
      taxi,
      airportShuttle,
      wheelChair,
      starGrade,
      city,
      cityCenter,
      province
    );

    res.status(200).json({
      status: "Success",
      data: score,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
});

router.get("/popularity", async (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;
  const starGrade = req.query.starGrade;

  let popularityLevel = await popularityController.getPopularityScore(
    lat,
    long,
    starGrade
  );

  res.send(JSON.stringify(popularityLevel));
});

router.post("/reviewSentiment", async (req, res) => {
  const reviews = req.body.reviews;

  let sentiment = await popularityController.getSentiment(reviews);

  res.send(JSON.stringify(sentiment));
});

/*####################### Demand Forecasting (Start) ################################*/

router.get("/demand", async (req, res) => {
  try {
    const province = req.query.province;

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

/*####################### Demand Forecasting (End) ################################*/

router.get("/answer", async (req, res) => {
  const question = req.query.question;
  const projectId = "positive-lambda-306504";
  const { Translate } = require("@google-cloud/translate").v2;
  const translate = new Translate({ projectId });

  const [language] = await translate.detect(question);
  let answer = "";

  const getTranslation = async (translate, text, target) => {
    console.log(`Translating to ${target}`);
    const [translation] = await translate.translate(text, target);
    return translation;
  };

  switch (language.language) {
    case "en":
      console.log("Language detected as English");
      console.log(question);
      answer = await qnaContoller.getAnswer(question);
      break;
    case "si":
      console.log("Language detected as Sinhala");
      translatedQuestion = await getTranslation(translate, question, "en");
      answer = await qnaContoller.getAnswer(translatedQuestion);
      answer.answer = await getTranslation(translate, answer.answer, "si");
      answer.doc_title = await getTranslation(
        translate,
        answer.doc_title,
        "si"
      );
      answer.paragraph = await getTranslation(
        translate,
        answer.paragraph,
        "si"
      );
      break;
    default:
      console.log("Language not supported");
      break;
  }
  res.send(JSON.stringify(answer));
});

router.get("/features", async (req, res) => {
  console.log(req.query.province);
  Feature.find({ region: req.query.province }, function (err, features) {
    if (err) console.log(err);
    else {
      res.json(features);
    }
  });
});

module.exports = router;
