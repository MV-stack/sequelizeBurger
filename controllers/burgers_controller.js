var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  db.Burger.findAll({})
    .then(function (data) {
   //   console.log(data)

      let newData = data.map(elem=> {return {
        id: elem.id,
        burger_name: elem.burger_name,
        devoured: elem.devoured
      }})

      var hbsObject = {
        burgers: newData
      };
   //   console.log(hbsObject);
      res.render("index", hbsObject);
    });
});

router.post("/", function (req, res) {
  console.log(req.body)
  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: false
  }).then(
    function () {
      res.redirect("/");
    });
});

router.put("/:id", function (req, res) {
console.log("put: ", req.body )
  db.Burger.update({ devoured: req.body.devoured }, {
    where: {
      id: req.params.id
    }
  }).then( function () {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
