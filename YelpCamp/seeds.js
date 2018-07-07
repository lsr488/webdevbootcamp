// create initial data for database

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest", 
    image: "https://images.unsplash.com/photo-1496545672447-f699b503d270",
    description: "We can always carry this a step further. There's really no end to this. But they're very easily killed. Clouds are delicate. Paint anything you want on the canvas. Create your own world. That's what makes life fun. That you can make these decisions. That you can create the world that you want. In life you need colors. From all of us here, I want to wish you happy painting and God bless, my friends."
  },
  {
    name: "Granite Hill", 
    image: "https://images.unsplash.com/19/nomad.JPG",
    description: "You don't have to spend all your time thinking about what you're doing, you just let it happen. Imagination is the key to painting. This present moment is perfect simply due to the fact you're experiencing it."
  },
  {
    name: "Harper's Grove", 
    image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03",
    description: "This is truly an almighty mountain. See how easy it is to create a little tree right in your world. We're trying to teach you a technique here and how to use it. You can do anything here - the only pre-requisite is that it makes you happy."
  },
  {
    name: "Desert Mesa", 
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "We'll make some happy little bushes here. Working it up and down, back and forth. I sincerely wish for you every possible joy life could bring. We might as well make some Almighty mountains today as well, what the heck. If you don't like it - change it. It's your world. If you overwork it you become a cloud killer. There's nothing worse than a cloud killer."
  },
  {
    name: "Canyon Floor", 
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Now it's beginning to make a little sense. At home you have unlimited time. Talk to trees, look at the birds. Whatever it takes. It's amazing what you can do with a little love in your heart. Let your imagination be your guide. From all of us here, I want to wish you happy painting, my friends."
  }
]

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(error) {
    // if(error) {
    //   console.log(error);
    // }
    // console.log("Removed campgrouds.");
 
    // // add campgrounds
    // data.forEach(function(seed) {
    //   Campground.create(seed, function(error, campground) {
    //     if(error) {
    //       console.log(error);
    //     } else {
    //       console.log("Campground added.");
    //       // create a comment
    //       Comment.create(
    //         {
    //           text: "This place is great, but I wish there was internet!",
    //           author: "Homer"
    //         }, function(error, comment) {
    //           if(error) {
    //             console.log(error);
    //           } else {
    //             campground.comments.push(comment);
    //             campground.save();
    //           console.log("Created new comment.");
    //           }
    //         });
    //       }
    //     });
    // });
  });
  
}

module.exports = seedDB;