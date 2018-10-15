//Storing data:
myObj = [
  {
    name: "Kayak Outing on Lake Chapala", 
    date: "Monday, October 15 2018", 
    hour: "8:00 AM", 
    address: "Maria Isabel Restaurant, Ajijic, Jalisco", 
    host: "Lake Chapala Kayak Club",
    desc: "New members would be expected to be able to swim, be familiar with wearing a PFD, and have a general comfort level on the water from having some experience kayaking, canoeing, or sailing.",
    qtyAttend: 10,
    imgPlace: ["https://q-ec.bstatic.com/images/hotel/max1280x900/227/22795009.jpg", "https://www.ecestaticos.com/imagestatic/clipping/a0a/d98/a0ad98dc552223bc3e12e4f0c5cb91d9/por-que-es-mejor-que-viajemos-en-tren-en-lugar-de-en-avion.jpg?mtime=1500895657","https://media-cdn.tripadvisor.com/media/photo-s/07/f2/86/49/increible-lugar-para.jpg"],
    activities: ["Actividad 1", "Actividad 2"],
    attendants: ["Manuel Sánchez","Roberto Jiménez"]
  },
  {
    name: "Escribe JavaScript moderno con ES6", 
    date: "Friday, October 19 2018", 
    hour: "3:00 PM", 
    address: "Av. Chapultepec Sur 284 - 103 Americana CP 44160 Guadalajara, Jalisco Mexico", 
    host: "Bedu/Tech: Academia de desarrolladores",
    desc: "Asiste a nuestra experiencia introductoria y escribe JavaScript moderno con ECMAScript 6. Construiremos una aplicación web interactiva desde cero.",
    qtyAttend: 30,
    imgPlace: ["https://q-ec.bstatic.com/images/hotel/max1280x900/155/155037492.jpg", "https://picsum.photos/1000/500?image=0", "https://picsum.photos/1000/500?image=1"],
    activities: ["Actividad 1", "Actividad 2"],
    attendants: ["Andrea Olarte","Carmen Miranda"]
  },
  {
    name: "Servidor Web Chinito: Tengine",
    date: "Saturday, October 20 2018", 
    hour: "6:00 PM", 
    address: "LinuxCabal AC - Calle 14 #2184-A, Guadalajara", 
    host: "LinuxCabal",
    desc: "Tengine has been an open source project since December 2011. It's being developed by the Tengine team, whose core members are from Taobao, Sogou and other Internet companies.",
    qtyAttend: 25,
    imgPlace: ["https://q-ec.bstatic.com/images/hotel/max1280x900/155/155037514.jpg", "https://loremflickr.com/1000/500/paris,girl/all"],
    activities: ["Actividad 1", "Actividad 2"],
    attendants: ["Ismael González","Fabricio Estrada"]
  },
  {
    name: "React for Dummies",
    date: "Friday, October 26 2018", 
    hour: "5:00 PM", 
    address: "Av. Chapultepec Sur 284 - 103 Americana CP 44160 Guadalajara, Jalisco Mexico", 
    host: "Bedu",
    desc: "React es la libreria de JS que se está comiendo la web. En este taller aprenderás cómo empezar a utilizar esta herramienta para construir tu primera single page app.",
    qtyAttend: 50,
    imgPlace: ["https://r-ec.bstatic.com/images/hotel/max1280x900/477/4777517.jpg", "https://r-ec.bstatic.com/images/hotel/max1280x900/162/162727368.jpg"],
    activities: ["Actividad 1", "Actividad 2"],
    attendants: ["Isabel Vargas","Fernanda Pérez"]
  }
];

myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

//Retrieving data:
text = localStorage.getItem("testJSON");
obj = JSON.parse(text);
var JSONtoSend;
for(var i = 1; i < 5; i++){
  document.getElementById("e-name" + i).innerHTML = obj[i - 1]['name'];
  document.getElementById("e-img" + i).src = obj[i - 1].imgPlace[0];
  document.getElementById("e-desc" + i).innerHTML = obj[i - 1].desc;
  document.getElementById("e-qty" + i).innerHTML = obj[i - 1].qtyAttend + " people";
  JSONtoSend = JSON.stringify(myObj[i - 1]);
  document.getElementById("goto-product" + i).href = "event-details.html?event=" + JSONtoSend;
}

function showEvent(index){
  var JSONtoSend = JSON.stringify(myObj[index]);
  window.location = "event-details.html?event=" + JSONtoSend;
}