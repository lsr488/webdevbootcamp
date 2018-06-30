var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post 1", author: "Suzie"},  
    {title: "My adorable pet bunny", author: "Alan"},  
    {title: "Can you believe this pomsky?", author: "Ian Malcolm"},  
  ];
  //                        templateName: appjsName
  res.render("posts.ejs", {posts: posts})
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started.")
})