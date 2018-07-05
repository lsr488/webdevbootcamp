var express               = require("express"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    mongoose              = require("mongoose");


mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true });

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
  // 'secret' string is used to code and unencode information in a session
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// very important for passport
// responsible for reading session, encoding and decoding info if logged in or not
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =========
// ROUTES
// =========

app.get("/", function(req, res) {
  res.render("home");
});


app.get("/secret", isLoggedIn, function(req, res) {
  res.render("secret");
});

// show signup form
app.get("/register", function(req, res) {
  res.render("register");
});

// handle user signup
app.post("/register", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if(err) {
      console.log(err)
      return res.render("register");
    }
    // this uses the "local" authentication strategy, could also use eg FB
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secret");
    });
  });
});

// show login form
app.get("/login", function(req, res) {
  res.render("login")
;});

// handle login submission
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res) {

});

// logout
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
}); 

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started.");
});