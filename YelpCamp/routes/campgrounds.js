var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// automatically require /index.js because it's called index
var middleware = require("../middleware");

// INDEX route -- display all campgrounds
// get campgrounds page
router.get("/", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(error, allCampgrounds) {
    if(error) {
      console.log("Campground index get route error:", error);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
    }
  });
});

// CREATE route -- add new campground to db
router.post("/", middleware.isLoggedIn, function(req, res) {
  // get data from form
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, price: price, image: image, description: desc, author: author};
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new.ejs");
});

// SHOW route -- shows more info about one campground
router.get("/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
    if(error || !foundCampground) {
      req.flash("error", "Campground not found.");
      res.redirect("back");
    } else {
      // render show template with that campground
       res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {

  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      req.flash("error", err.message);
    }
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if(err) {
      res.redirect("/campground");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(error) {
    if(error) {
      res.redirect("/campgrounds");
    } else {
        req.flash("success", "Campground deleted.");
        res.redirect("/campgrounds");
    }
  });
});

module.exports = router;