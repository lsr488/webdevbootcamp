var mongoose = require("mongoose");

// USER model - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

// need to export! just like returning value from a function
var User = mongoose.model("User", userSchema);
module.exports = User;
