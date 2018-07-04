var mongoose = require("mongoose");

// campground Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }  
  ]
}); 

// create campground model
var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;