# Mongoose

* Provides help interacting with MongoDB via Javascript, like jQuery does the DOM.

* The usual set up for packages in a JS file:
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
(if the specified db doesn't exist ("cat_app"), it will be created)

* You also need to define the base pattern for objections within each database.
var catSchema = new.mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

* then create a Cat model to more easily interact with cats and apply methods and such
var Cat = mongoose.model("Cat", catScheme);
"Cat" should always be the singular form of the model

* then you can CREATE new cat entries in the database (can also use NEW and SAVE as separate functions)
Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "bland"
}, function(error, cat) {
  if(error) {
    console.log(error);
  } else {
    console.log(cat);
  }
});
