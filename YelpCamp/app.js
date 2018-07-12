var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    moment      = require("moment"),
    flash       = require("connect-flash"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Comment     = require("./models/comment");

// requiring routes
var commentRoutes = require("./routes/comments"),
    indexRoutes   = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds");

// creates/connects to the yelp_camp database
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment;

// seed DB with initial data
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again, Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware that passes the currentUser info to each route
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started.");
});