// create initial data for database

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest", 
    image: "https://images.unsplash.com/photo-1496545672447-f699b503d270",
    description: "A high-elevation campground where you can almost touch the clouds!"
  },
  {
    name: "Granite Hill", 
    image: "https://images.unsplash.com/19/nomad.JPG",
    description: "This is a huge granite hill, no bathrooms, no water, just beautiful granite!"
  },
  {
    name: "Harper's Grove", 
    image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03",
    description: "Spacious campsites in the heart of a coastal redwood grove."
  },
  {
    name: "Desert Mesa", 
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Lorem ipsum dolor sit amet."
  },
  {
    name: "Canyon Floor", 
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Ssed do eiusmod tempor incididunt ut labore et dolore magna."
  }
]

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(error) {
    if(error) {
      console.log(error);
    }
    console.log("Removed campgrouds.");
 
    // add campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(error, campground) {
        if(error) {
          console.log(error);
        } else {
          console.log("Campground added.");
          // create a comment
          Comment.create(
            {
              text: "This place is great, but I wish there was internet!",
              author: "Homer"
            }, function(error, comment) {
              if(error) {
                console.log(error);
              } else {
                campground.comments.push(comment);
                campground.save();
              console.log("Created new comment.");
              }
            });
          }
        });
    });
  });
  
}

module.exports = seedDB;