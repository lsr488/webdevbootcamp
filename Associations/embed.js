var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// POST model - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
var Post = mongoose.model("Post", postSchema);

// USER model - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// create a new user
// var newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "Hermione Granger"
// });

// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding, go to potions class!"
// });

// newUser.save(function(error, user) {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log(user);
//   }
// });

// create a new post
// var newPost = new Post({
//   title: "Reflections on Apples",
//   content: "They are delicious."
// });

// newPost.save(function(error, post) {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({name: "Hermione Granger"}, function (error, user) {
     if(error) {
    console.log(error);
  } else {
    // console.log(user);
    user.posts.push({
      title: "Three Things I Really Hate",
      content: "Voldemort. Voldemort. Voldemort."
    });
    user.save(function(error, user) {
      if(error) {
        console.log(error);
      } else {
        console.log(user);
      }
    });
  }
});