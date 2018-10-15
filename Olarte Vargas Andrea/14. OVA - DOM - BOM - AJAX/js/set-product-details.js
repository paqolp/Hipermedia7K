function getUrlVars() {
  var vars = {};
  // <--------------------------------------------------- USO DEL BOM --------------------------------------------------->
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

var product = parseInt(getUrlVars()['product']);

// <--------------------------------------------------- USO DE AJAX --------------------------------------------------->
var requestURL = 'https://raw.githubusercontent.com/AndreaOlarte/hipermedia-json/master/products.json';
var request2 = new XMLHttpRequest();
request2.open('GET', requestURL);
request2.responseType = 'json';
request2.send();
request2.onload = setProductDetails;

function setProductDetails() {
  var myProducts = request2.response;
  // <--------------------------------------------------- USO DEL DOM --------------------------------------------------->
  document.getElementById("details-name").innerHTML = myProducts[product]['name'];
  document.getElementById("details-img").src = myProducts[product]['picture'];
  document.getElementById("details-price").innerHTML = "$" + myProducts[product]['price'];
  document.getElementById("details-desc").innerHTML = myProducts[product]['description'];
  document.getElementById("details-customer1").innerHTML = myProducts[product]['reviews'][0]['customer'];
  document.getElementById("details-stars1").innerHTML = myProducts[product]['reviews'][0]['stars'] + " stars";
  document.getElementById("details-review1").innerHTML = myProducts[product]['reviews'][0]['review'];
  document.getElementById("details-customer2").innerHTML = myProducts[product]['reviews'][1]['customer'];
  document.getElementById("details-stars2").innerHTML = myProducts[product]['reviews'][1]['stars'] + " stars";
  document.getElementById("details-review2").innerHTML = myProducts[product]['reviews'][1]['review'];
}