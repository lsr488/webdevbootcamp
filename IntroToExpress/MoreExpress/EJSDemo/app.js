var express = require("express");
var app = express();

// serves the css
app.use(express.static("public"));

// lets you remove ".ejs" from the render statement; it assumes .ejs
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post 1", author: "Suzie"},  
    {title: "My adorable pet bunny", author: "Alan"},  
    {title: "Can you believe this pomsky?", author: "Ian Malcolm"},  
  ];
  //                        templateName: appjsName
  res.render("posts", {posts: posts})
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started.")
})