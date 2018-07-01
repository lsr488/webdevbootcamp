var express   = require("express"),
  app         = express(),
  bodyParser  = require("body-parser"),
  mongoose    = require("mongoose");

// creates/connects to the yelp_camp database
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
}); 

// create model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name:  "Granite Hill", 
//     image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"
//   }, function(error, campground) {
//     if(error) {
//       console.log("New campground error:");
//       console.log(error);
//     } else {
//       console.log("New campground created:");
//       console.log(campground);
//     }
//   });

// get landing page
app.get("/", function(req, res) {
  res.render("landing");
});

// get campgrounds page
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(error, allCampgrounds) {
    if(error) {
      console.log(error);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

// add new campgrounds
app.post("/campgrounds", function(req, res) {
  // get data from form
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  // add new campground to campgrounds db
  Campground.create(newCampground, function(error, newlyCreated) {
    if(error) {
      console.log(error);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// show new campgrounds form
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs")
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started.");
});