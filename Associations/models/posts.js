var mongoose = require("mongoose");

// POST model - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// .export REQUIRED, just like values need to be RETURNED at the end of a function
module.exports = mongoose.model("Post", postSchema);