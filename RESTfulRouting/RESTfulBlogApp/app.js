var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    
// app config    
mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

// EDIT ROUTE
// need to FIND correct blog
app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function(error, foundBlog) {
     if(error) {
       res.redirect("/blogs");
     } else {
        res.render("edit", {blog: foundBlog}); 
     }
   });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog) {
    if(error) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(error) {
    if(error) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started.");
});