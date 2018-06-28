// Average Grades

// create a function named average
// take a single parameter, array of test scores (all numbers)
// return average score in the array, rounded to nearest whole number (there's a special Math method)

// total score is 657
// avg score should be 94
var scores = [90, 98, 89, 100, 100, 86, 94];

//scores 2 should return 68
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

// this is called an "accumulator pattern"
function average(grades) {
  // add all scores together
  var total = 0;
  // divide by arr.length
  grades.forEach(function(score) {
    total = total + score
  });
  var avg = total / grades.length;
  // round
  return Math.round(avg);
}

console.log(average(scores));
console.log(average(scores2));