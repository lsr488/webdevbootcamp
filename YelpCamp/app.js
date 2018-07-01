var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// get landing page
app.get("/", function(req, res) {
  res.render("landing");
});

// get campgrounds page
app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"}
  ]
  
  res.render("campgrounds", {campgrounds: campgrounds});
});

// post campgrounds
app.post("/campgrounds", function(req, res) {
  // get data from form
  // add to campgrounds array
  // redirect back to campgrounds page
});


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started.");
});