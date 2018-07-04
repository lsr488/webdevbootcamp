var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });

// import POSTS file
var Post = require("./models/posts");

// import USERS file
var User = require("./models/users");

// User.create({
//   email: "bob@hogwarts.com",
//   name: "Bob Belcher"
// });

// made independently of User
Post.create({
  title: "How to Cook the Best Burger Part 4",
  content: "Now you know how to make the best burger AGAIN!"
}, function(error, post) {
  // find one user to associate the post with
  User.findOne({email: "bob@hogwarts.com"}, function (error, foundUser) {
    if(error) {
      console.log(error);
    } else {
      // push the post content (id #) to the posts value of the User Schema
      foundUser.posts.push(post);
      // save the post content (id #) to the posts value of User Schema in the db
      foundUser.save(function(error, savedPost) {
        if(error) {
          console.log(error);
        } else {
          console.log(savedPost);
        }
      });
    }
  });
});

// find user
// find all posts for that user

// .populate("posts") will add post content to the posts section of User
// .exec executes everything
// User.findOne({email: "bob@hogwarts.com"}).populate("posts").exec(function(error, user) {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log(user);
//   }
// });