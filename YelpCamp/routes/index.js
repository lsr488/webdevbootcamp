var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function(req, res) {
  res.render("landing");
});


// registration page
router.get("/register", function(req, res) {
  res.render("register");
});

// handle signup logic
router.post("/register", function(req, res) {
  var newUser = User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// show LOGIN form
router.get("/login", function(req, res) {
  res.render("login");
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

module.exports = router;