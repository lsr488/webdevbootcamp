var express   = require("express"),
  app         = express(),
  bodyParser  = require("body-parser"),
  mongoose    = require("mongoose"),
  Campground  = require("./models/campground"),
  seedDB      = require("./seeds");

// seed DB with initial data
// seedDB();

// creates/connects to the yelp_camp database
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// get landing page
app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX route -- display all campgrounds
// get campgrounds page
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(error, allCampgrounds) {
    if(error) {
      console.log(error);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE route -- add new campground to db
app.post("/campgrounds", function(req, res) {
  // get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // add new campground to campgrounds db
  Campground.create(newCampground, function(error, newlyCreated) {
    if(error) {
      console.log(error);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW route -- show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs")
});

// SHOW route -- shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
    if(error) {
      console.log("Campground.findById error" + error);
    } else {
       res.render("show", {campground: foundCampground});
    }
  });
  // render show template with that campground
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started.");
});