var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
// app config    
mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose/model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful routes

// ROOT ROUTE
app.get("/", function(req, res) {
  res.redirect("blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(error, blogs) {
    if(error) {
      console.log("ERROR");
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
  Blog.create(req.body.blog, function(error, newBlog) {
    if(error) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE

// EDIT ROUTE

// UPDATE ROUTE

// DESTROY ROUTE

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started.");
});