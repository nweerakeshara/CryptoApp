const express = require("express");
const router = express.Router();
const Valuation = require("../model/valuation");

//to add valuations to db
router.route("/add").post(function (req, res) {
  const newValuations = new Valuation({
    label: req.body.label,
    username: req.body.username,
    coordinates: req.body.coordinates,
    attraction: req.body.attraction,
    accessibility: req.body.accessibility,
    competition: req.body.competition,
    demand: req.body.demand,
  });

  newValuations
      .save()
      .then((data) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ success: false });
      });
});

/*check here*/
router.route("/list/:id").get(function (req, res) {
  Valuation.find({username: req.params.id},function (err, valuation) {
    if (err) console.log(err);
    else {
      res.json(valuation);
    }
  });
});

router.route('/delete/:id').get(function(req, res){
  Valuation.findByIdAndRemove({_id:req.params.id}, function(err, valuation){
    if(err){
      res.json({ success: false });
    }
    else {
      res.json({ success: true });
    }
  });
});

module.exports = router;
