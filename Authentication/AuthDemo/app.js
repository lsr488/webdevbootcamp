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

app.use(require("express-session")({
  // 'secret' string is used to code and unencode information in a session
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// very import for passport
// responsible for reading session, encoding and decoding info if logged in or not
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started.");
})