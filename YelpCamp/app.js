var express = require("express");
var app = express();
app.set("view engine", "ejs");


// landing page
app.get("/", function(req, res) {
  res.render("landing");
});

// campgrounds page
app.get("/campgrounds", function(req, res) {
  var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c57aa7eab7b0_340.jpg"}
  ]
  
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started.");
});