var faker = require("faker");

function fakeList() {
  console.log("=======================");
  console.log("  WELCOME TO MY SHOP!  ");
  console.log("=======================");
  
  for(var i = 0; i < 10; i++) {
    var randomProduct = faker.commerce.productName();
    var randomPrice = faker.commerce.price();

    console.log(i+1 + ". " + randomProduct + " - $" + randomPrice);
  }  
}

fakeList();