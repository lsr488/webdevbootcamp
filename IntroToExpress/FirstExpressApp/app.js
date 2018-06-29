var express = require("express");
var app = express(); 

// "/" => "Hi there!"
  // app.get("root path", function(request, response) {})
app.get("/", function(req, res) {
  res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
  res.send("Goodbye!");
});

// "/dog" => "Meow!"
app.get("/dog", function(req, res) {
  console.log("Request made to /dog.")
  res.send("Meow!");
});

// goes to subreddit landing page
app.get("/r/:subredditName", function(req, res){
  console.log(req.params);
  var subreddit = req.params.subredditName;
  res.send("welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

// goes to an individual post within a subreddit
app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
  console.log(req.params);
  res.send("welcome to the comments page");
});

app.get("*", function(req, res){
  res.send("You're a STAR!!");
});

// Tell Express to listen for requests (star server)
  // "process.env.PORT" and "process.env.IP" arecle specific for cloud9
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started.");
});