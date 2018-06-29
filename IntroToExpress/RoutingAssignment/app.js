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

app.get("/", function(req, res) {
  res.send("Go to /speak/[Animal] OR /repeat/[Word]/[#]");
});

// ANIMAL ROUTES
app.get("/speak/:animalName", function(req, res) {
  var animal = req.params.animalName;
  function animalNoise() {
     if(req.params.animalName == "dog") {return "WOOF";}
     if(req.params.animalName == "pig") {return "OINK";}
     if(req.params.animalName == "cow") {return "MOO";}
     if(req.params.animalName == "cat") {return "MEOW";}
     if(req.params.animalName == "mouse") {return "SQUEAK";}
  }
  
  res.send("The " + animal + " says " + animalNoise() + ".");
});

// REPEAT
app.get("/repeat/:wordToRepeat/:numToRepeat", function(req, res) {
  console.log(req.params);
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

// Tell Express to listen for requests (star server)
  // "process.env.PORT" and "process.env.IP" arecle specific for cloud9
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started.");
});