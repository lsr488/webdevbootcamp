var mongoose = require("mongoose");
// if the specified db doesn't exist, it will be created
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// add a new cat to the database
// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "evil"
// });

// george.save(function(error, cat){
//   if(error) {
//     console.log("Something went wrong with the save.")
//   } else {
//     console.log("We just saved a cat to the database.");
//     console.log(cat);
//   }
// });

// .create is .new + .save
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

// retrieve all cats from the database & console.log each one
Cat.find({}, function(error, cats) {
  if(error) {
    console.log("Couldn't find cats.");
    console.log(error);
  } else {
    console.log("All the cats:");
    console.log(cats);
  }
});