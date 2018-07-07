var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX route -- display all campgrounds
// get campgrounds page
router.get("/", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(error, allCampgrounds) {
    if(error) {
      console.log("Campground index get route error:", error);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE route -- add new campground to db
router.post("/", function(req, res) {
  // get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // add new campground to campgrounds db
  Campground.create(newCampground, function(error, newlyCreated) {
    if(error) {
      console.log("Campground create post error:", error);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW route -- show form to create new campground
router.get("/new", function(req, res) {
  res.render("campgrounds/new.ejs");
});

// SHOW route -- shows more info about one campground
router.get("/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
    if(error) {
      console.log("Campground.findById error" + error);
    } else {
       res.render("campgrounds/show", {campground: foundCampground});
    }
  });
  // render show template with that campground
});

module.exports = router;