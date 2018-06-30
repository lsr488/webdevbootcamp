var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Pierre", "Justin", "Lily"];

app.get("/", function(req, res) {
  res.render("home");
});

// shows a list of friends
app.get("/friends", function(req, res) {
  res.render("friends", {friends: friends});
});

// post route for adding friends
app.post("/addfriend", function(req, res) {
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started.")
});