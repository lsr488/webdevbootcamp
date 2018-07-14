var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

// root route
router.get("/", function(req, res) {
  res.render("landing");
});


// registration SHOW page
router.get("/register", function(req, res) {
  res.render("register", {page: "register"});
});

// handle register logic
router.post("/register", function(req, res) {
  var newUser = User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      avatar: req.body.avatar,
    });
  // user needs to input the correct secret code to gain admin access
  if(req.body.adminCode == "secretcode123") {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
    req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
    res.redirect("/campgrounds");
    });
  });
});

// show LOGIN form
router.get("/login", function(req, res) {
  res.render("login", {page: "login"});
});

// handle login logic
// uses middleware
router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res) {
});

// logout routes
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You logged out.");
  res.redirect("/campgrounds");
});

// user profile
router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err || !foundUser) {
      req.flash("error", "Something went wrong // user profile route.");
      res.redirect("/");
    }
    
    Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds) {
      if(err) {
        req.flash("error", "Somehing went wrong // user profile campground route.");
        req.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    });
  });
});

module.exports = router;