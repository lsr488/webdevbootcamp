// Node Exercise

// create "echo.js"
// write function named echo that takes 2 arguments, string and number
// print out string Number number of times

function echo(str, num) {
  for(var i = 0; i < num; i++) {
    console.log(str);
  }
}

echo("Echo!!!", 10);
echo("Tater Tots", 3)