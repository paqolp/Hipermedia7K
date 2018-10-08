var indexProducts = 0;

// SÍ FUNCIONA
// var myObj = {name: "John", age: 31, city: "New York"};
// myJSON = JSON.stringify(myObj);
// localStorage.setItem("testJSON", myJSON);

// text = localStorage.getItem("testJSON");
// var obj = JSON.parse(text);
// document.getElementById("product-name").innerHTML = obj.name; 

var requestURL = 'https://raw.githubusercontent.com/AndreaOlarte/hipermedia-json/master/products.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = setProductsOnPage;

function setProductsOnPage() {
  var myProducts = request.response;
  document.getElementById("cart-item-name1").innerHTML = myProducts[5]['name'];
  document.getElementById("cart-item-img1").src = myProducts[5]['picture'];
  document.getElementById("cart-item-price1").innerHTML = "$" + myProducts[5]['price'];
  document.getElementById("cart-item-name2").innerHTML = myProducts[23]['name'];
  document.getElementById("cart-item-img2").src = myProducts[23]['picture'];
  document.getElementById("cart-item-price2").innerHTML = "$" + myProducts[23]['price'];
  document.getElementById("cart-item-name3").innerHTML = myProducts[45]['name'];
  document.getElementById("cart-item-img3").src = myProducts[45]['picture'];
  document.getElementById("cart-item-price3").innerHTML = "$" + myProducts[45]['price'];

  document.getElementById("subtotal").innerHTML = "$" + (3 * myProducts[5]['price'] + 2 * myProducts[23]['price'] + myProducts[45]['price']) + ".00";
  
  for(var i = 0; i < 28; i++){
    document.getElementById("product-name" + i).innerHTML = myProducts[(28 * indexProducts + i)]['name'];
    document.getElementById("product-img" + i).src = myProducts[(28 * indexProducts + i)]['picture'];
    document.getElementById("product-alt-img" + i).src = myProducts[(28 * indexProducts + i)]['picture'];
    // document.getElementById("product-alt-img" + i).src = myProducts[(28 * indexProducts + i)]['alternative-pic'];
    document.getElementById("product-price" + i).innerHTML = "$" + myProducts[(28 * indexProducts + i)]['price'];

    document.getElementById("goto-product" + i).href = "single-product-details.html?product=" + (28 * indexProducts + i);
  }
}

function changeIndex(index){
  indexProducts = index;
  // request.onload = setProductsOnPage;
  // location.reload(true);
  request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  
  request.onload = setProductsOnPage;
}

function orderPlaced(){
  alert("THANK YOU FOR BUYING WITH US!\nYour order has been placed.");
}




// function getUrlVars() {
//   var vars = {};
//   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
//       vars[key] = value;
//   });
//   return vars;
// }

// var product = getUrlVars()['product'];

// request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function(){
//   var myProducts = request.response;
//   document.getElementById("details-name").innerHTML = myProducts[product]['name'];
//   document.getElementById("details-img").src = myProducts[product]['picture'];
//   document.getElementById("details-alt-img").src = myProducts[product]['alternative-pic'];
//   document.getElementById("details-price").innerHTML = "$" + myProducts[product]['price'];
//   document.getElementById("details-desc").innerHTML = myProducts[product]['description'];
// }
