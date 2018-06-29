// Express Routing Assignment

// create new app
// create package.json `npm init`, add express as a dependency
// add 3 routes

// "/" -> "Hi there, welcome to my assignment!"
// ============================================
// ONE ROUTE DEFINITION

// "/speak/pig" -> "The pig says OINK."
// "/speak/cow" -> "The pig says MOO."
// "/speak/dog" -> "The pig says WOOF."
// "/speak/cat" -> "The pig says MEOW."
// "/speak/mouse" -> "The pig says SQUEAK."

// ============================================
// SHOULD WORK FOR ANY WORD AND ANY NUMBER

// "/repeat/hello/3" -> "hello hello hello"
// "/repeat/hello/5" -> "hello hello hello hello hello"
// "/repeat/blah/2" -> "blah blah"

// For any other page, "Sorry, page not found."

// ADD EXPRESS
var express = require("express");
var app = express(); 

// ROOT ROUTE
app.get("/", function(req, res) {
  res.send("Go to /speak/[ANIMAL] OR /repeat/[WORD]/[#]");
});

// ANIMAL ROUTES
app.get("/speak/:animalName", function(req, res) {
  var animal = req.params.animalName.toLowerCase();
  var sounds = {
    dog: "WOOF",
    pig: "OINK",
    cow: "MOO",
    cat: "I hate you, human",
    mouse: "SQUEAK"
  }
  var sound = sounds[animal];
  
  res.send('The ' + animal + ' says, "' + sound + '."');
});

// REPEAT
app.get("/repeat/:wordToRepeat/:numToRepeat", function(req, res) {
  var word = req.params.wordToRepeat;
  var num = parseInt(req.params.numToRepeat);
  var wordString = "";
  function repeater() {
    for(var i = 0; i < num; i++) {
      wordString = wordString + " " + word;
    }
    return wordString;
  }
  
  res.send(repeater(wordString));
});

// Anything else
app.get("*", function(req, res){
  res.send("Sorry, page not found");
});

// Tell Express to listen for requests (starT server)
  // "process.env.PORT" and "process.env.IP" arecle specific for cloud9
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started.");
});