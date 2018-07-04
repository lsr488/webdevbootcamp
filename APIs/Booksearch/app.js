var express = require("express");
var app = express();
var request = require("request");
var xml2js = require("xml2js").parseString;
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// var xml ='<root>Hi mama!</root>';
// xml2js(xml, function (err, result) {
//     console.dir(result["root"]);
// });

// root route, the search form
app.get("/", function(req, res) {
  res.render("search");
})

// INDEX ROUTE
// general search
// TODO: strip out punctuation from search query
app.get("/results", function(req, res) {
  // var query = "kimmel kathleen";
  var query = req.query.search;
  var url = "https://reststop.randomhouse.com/resources/works?search=" + query;
  request(url, function (error, response, body) {
    xml2js(body, function(error, data) {
      var newData = JSON.stringify(data);
      var jsData = JSON.parse(newData);
      // console.log("NEWDATA:", jsData);
      // console.log("WORKS:", jsData["works"]);
      // console.log("WORKS WORK:", jsData["works"]["work"]);
      // console.log("WORKS WORK TITLEWEB:", jsData["works"]["work"][0]["titleweb"][0]);
      // console.log("TITLES:", jsData["titles"]);
      // console.log("TITLES TITLE:", jsData["titles"]["title"]);
      // console.log("TITLES TITLE AUTHORWEB:", jsData["titles"]["title"][0]["authorweb"][0]);
      // console.log("TITLES TITLE TITLEWEB:", jsData["titles"]["title"][0]["titleweb"][0]);
      // console.log("TITLES TITLE ISBN:", jsData["titles"]["title"][0]["isbn"][0]);
      // console.log("INDIV RECORD 0:", jsData["works"]["work"][0]);
      // console.log("INDIV RECORD 1:", jsData["works"]["work"][1]);
      // console.log("INDIV RECORD 2:", jsData["works"]["work"][2]);
      // console.log("AUTHOR NAME:", jsData["works"]["work"][0]["authorweb"][0]);
      // console.log("TITLE NAME:", jsData["works"]["work"][0]["titleweb"][0]);
      // console.log("WORKS WORK ARRAY ARRAY:", jsData["works"]["work"][0]["authorweb"]);
      // console.log("TITLE ISBN:", jsData["works"]["work"][0]["titles"][0]["isbn"][0]["_"]);
      res.render("results", {jsData: jsData});
    });
  });
});


// SHOW ROUTE
// individual book search, more info
app.get("/books", function(req, res) {
  // var query = "saint+anything";
  var query = req.query.name;
  console.log(query);

  var url = query;
  // var url = "https://reststop.randomhouse.com/resources/titles?search=" + query;
  console.log(url)
  request(url, function (error, response, body) {
    xml2js(body, function(error, data) {
      var newData = JSON.stringify(data);
      var jsData = JSON.parse(newData);
      // console.log("NEWDATA:", jsData);
      // console.log("JSDATA TITLE:", jsData["title"]);
      // console.log("JSDATA TITLE AUTHOR:", jsData["title"]["author"][0]);
      // console.log("JSDATA TITLE ISBN:", jsData["title"]["isbn"]);

      res.render("/books", {jsData: jsData});
    });
  });
});



app.listen(process.env.PORT, process.env.IP, function() {
  console.log("BookSearch App has started.");
});
