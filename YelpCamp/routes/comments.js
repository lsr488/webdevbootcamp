var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// new comment
router.get("/new", isLoggedIn, function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(error, campground) {
    if(error) {
      console.log(error);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// create comment
router.post("/", isLoggedIn, function(req, res) {
  // lookup campground by id
  Campground.findById(req.params.id, function(error, campground) {
    if(error) {
      console.log(error);
      res.redirect("/campgrounds");
    } else {
      // console.log(req.body.comment);
      // create new comment
      Comment.create(req.body.comment, function(error, comment) {
        if(error) {
          console.log(error);
        } else {
          // connect new comment to campground
          campground.comments.push(comment); 
          campground.save();
          // redir to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;