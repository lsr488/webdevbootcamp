var express   = require("express"),
  app         = express(),
  bodyParser  = require("body-parser"),
  mongoose    = require("mongoose"),
  Campground  = require("./models/campground"),
  seedDB      = require("./seeds"),
  Comment     = require("./models/comment");


// creates/connects to the yelp_camp database
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seed DB with initial data
// seedDB();

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
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
      res.redirect("/campgrounds/index");
    }
  });
});

// NEW route -- show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new.ejs")
});

// SHOW route -- shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
    if(error) {
      console.log("Campground.findById error" + error);
    } else {
       res.render("campgrounds/show", {campground: foundCampground});
    }
  });
  // render show template with that campground
});

// COMMENT ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(error, campground) {
    if(error) {
      console.log(error);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server has started.");
});