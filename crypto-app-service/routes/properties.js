const paginate = require("jw-paginate");
const express = require("express");
const router = express.Router();
const Property = require("../model/property");
const multer = require("multer");
const attractionController = require("../controller/attraction/attraction_controller");
const accessibilityController = require("../controller/accessibility/accessibility_controller");
const popularityController = require("../controller/location-popularity/location-popularity-controller");
const demandController = require("../controller/demand/demand-controller");
const geoDBCitiesService = require("../service/geo_db_cities");
const geoCodeService = require("../service/geocode_api_service");

//related to multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'api/uploads/');
    cb(null, "uploads"); /*save locations*/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); /*determine image type*/
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

//advertisements list will be taken without search
router.get("/paginate", (req, res) => {
  Property.find().then((items) => {
    const page = parseInt(req.query.page) || 1;

    // get size of items that should display
    const pageSize = 5;
    const pager = paginate(items.length, page, pageSize);

    // get the page number from item list
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pagination related data and items in the selected page
    return res.json({ pager, pageOfItems });
  });
});

//advertisements list will be taken with search
router.get("/paginate/search", (req, res) => {
  Property.find({
    $or: [
      { title: { $regex: req.query.sitem, $options: "i" } },
      { propertyType: { $regex: req.query.sitem, $options: "i" } },
      { region: { $regex: req.query.sitem, $options: "i" } } /*to search */,
    ],
  }).then((items) => {
    const page = parseInt(req.query.page) || 1;

    // get size of items that should display
    const pageSize = 5;
    const pager = paginate(items.length, page, pageSize);

    // get the page number from item list
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pagination related data and items in the selected page
    return res.json({ pager, pageOfItems });
  });
});

//to add advertisements to db
router.route("/add").post(upload.array("files"), async (req, res, next) => {
  let filesArray = [];
  req.files.forEach((element) => {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });
  let geocodeResults = await geoCodeService.geocodeAddress(req.body.addr);
  let lat = geocodeResults.lat;
  let long = geocodeResults.long;
  let attractionScore = null;
  let accessibilityScore = null;
  let demandScore = null;
  let popularityScore = null;
  console.log(req.body.valuation);
  if (req.body.valuation === "true") {
    let locationDetails = await geoDBCitiesService.getCityProvince(lat, long);
    console.log(locationDetails);

    let city = locationDetails.city;
    let cityCenter = locationDetails.cityCenter;
    let province = locationDetails.province;

    attractionScore = await attractionController.getAttractionScore(
      lat,
      long,
      req.body.beachType,
      Number(req.body.pvtBeach),
      Number(req.body.starGrade),
      city,
      cityCenter,
      province
    );
    accessibilityScore = await accessibilityController.getAccessibilityScore(
      lat,
      long,
      0,
      0,
      Number(req.body.wheelChair),
      Number(req.body.starGrade),
      city,
      cityCenter,
      province
    );
    popularityScore = await popularityController.getPopularityScore(
      lat,
      long,
      Number(req.body.starGrade)
    );
    demandScore = await demandController.getDemandScore(
      province
    );
  }
  let coordinates = { lat: lat, long: long };

  const newAd = new Property({
    title: req.body.title,
    username: req.body.username,
    propertyType: req.body.propertyType,
    region: req.body.region,
    sizeType: req.body.sizeType,
    size: req.body.size,
    addr: req.body.addr,
    des: req.body.des,
    starGrade: Number(req.body.starGrade),
    contactNum: req.body.contactNum,
    coordinates: coordinates,
    price: req.body.price,
    valuation: req.body.valuation,
    attraction: attractionScore,
    accessibility: accessibilityScore,
    competition: popularityScore,
    demand: demandScore,
    //demandGraph: req.body.imageName,
    files: filesArray,
  });

  newAd
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        document: result,
      });
    })
    .catch((err) => next(err));
});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Property.findById(id, function (err, property) {
    res.json(property);
  });
});
/*check here*/
router.route("/list/:id").get(function (req, res) {
  Property.find({ username: req.params.id }, function (err, property) {
    if (err) console.log(err);
    else {
      res.json(property);
    }
  });
});

router.route("/delete/:id").get(function (req, res) {
  Property.findByIdAndRemove({ _id: req.params.id }, function (err, property) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

router.route("/geocode").post(async function (req, res) {
  let address = req.body.addr;
  let coordinates = await geoCodeService.geocodeAddress(address);
  let locationDetails = await geoDBCitiesService.getCityProvince(
    coordinates.lat,
    coordinates.long
  );
  res.json({ coordinates, locationDetails });
});

router.route("/").get(function (req, res) {
  Property.find(
    null,
    {
      title: 1,
      sizeType: 1,
      size: 1,
      region: 1,
      files: 1,
      propertyType: 1,
      price: 1,
      id: 1,
      coordinates: 1,
    },
    function (err, property) {
      if (err) console.log(err);
      else {
        res.json(property);
      }
    }
  );
});

module.exports = router;
