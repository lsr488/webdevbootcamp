var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// root route


// search route


// results route
app.get("/results", function(req, res) {
  request("http://www.omdbapi.com/?apikey=thewdb&s=new", function(error, response, body) {
     if(!error && response.statusCode == 200) {
       var data = JSON.parse(body);
       res.render("results", {data: data});
     }
  });
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Movie App has started.")
});