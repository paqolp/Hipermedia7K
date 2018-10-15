function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
  
var event = getUrlVars()['event'].toString();
var myEvent = JSON.parse(decodeURI(event));


// var jsonEvents='[{"nombre":"Nombre Evento Prueba1", "fecha":"Fecha 1", "hora":"Hora 1", "direccion":"Dirección evento 1", "organizador":"Organizador del evento 1", "descripcion":"Descripción1", "noAsistentes":10, "asistentes": ["Manuel Sánchez","Roberto Jiménez"], "imgLugar":["https://www.ecestaticos.com/imagestatic/clipping/a0a/d98/a0ad98dc552223bc3e12e4f0c5cb91d9/por-que-es-mejor-que-viajemos-en-tren-en-lugar-de-en-avion.jpg?mtime=1500895657","https://media-cdn.tripadvisor.com/media/photo-s/07/f2/86/49/increible-lugar-para.jpg"],"actividades":["Nombre Actividad 1", "Nombre Actividad 2"]}]';
// var eventos = JSON.parse(jsonEvents);
// var numeroEvento=0;
document.body.onload=setEventDetails();


function setEventDetails() {
    document.getElementById("eventName").innerHTML = myEvent['name'];
    document.getElementById("eventDescription").innerHTML = myEvent['desc'];
    document.getElementById("carousel-event").innerHTML = setImages();
    document.getElementById("eventOrganizer").innerHTML = myEvent['host'];
    document.getElementById("eventAddress").innerHTML = myEvent['address'];
    document.getElementById("eventDate").innerHTML = myEvent['date'];
    document.getElementById("eventTime").innerHTML = myEvent['hour'];
    document.getElementById("numEventAttendees").innerHTML = myEvent['qtyAttend'];
    document.getElementById("event-activities").innerHTML = setActivities();
    document.getElementById("eventAttendees").innerHTML = setAttendees();

    JSONtoSend = JSON.stringify(myEvent);
    document.getElementById("e-edit").href = "event-edit.html?event=" + JSONtoSend;
}

function setImages(numEvento){
    var numImagenes=  myEvent.imgPlace.length;
    var imagenes='<ul class="carousel-indicators"> <li data-target="#carousel-event" data-slide-to="0" class="active"></li>';

    for (i=1;i<numImagenes;i++){
        imagenes+='<li data-target="#carosel-event" data-slide-to="'+i+'"></li>';
    }

    imagenes+='</ul> <div class="carousel-inner"> <div class="carousel-item active">';
    imagenes+='<img src='+myEvent.imgPlace[0]+' height="100%"> </div>';

    for (i=1;i<numImagenes;i++){
        imagenes+='<div class="carousel-item"> <img src="'+myEvent.imgPlace[i]+'"></div>';
    }

    imagenes+='</div>';
    imagenes+='<a class="carousel-control-prev" href="#carousel-event" data-slide="prev">';
    imagenes+='<span class="carousel-control-prev-icon"></span> </a>';
    imagenes+='<a class="carousel-control-next" href="#carousel-event" data-slide="next">';
    imagenes+='<span class="carousel-control-next-icon"></span> </a>';
    return imagenes;
}

function setActivities(){
    var numActivities=  myEvent['activities'].length;
    var actividades='<div class="col-lg-12">';

    for (i=0;i<numActivities;i++){
        actividades+='<div class="single-activity d-flex flex-row">';
        actividades+='<p class="col"> Actividad '+(i+1)+"</p>";
        actividades+='<p class="col-8">'+myEvent['activities'][i]+'</p>';
        actividades+='</div>';
    }

    actividades+='</div>';
    
    return actividades;
}

function setAttendees(){
    var numAttendees=  myEvent['attendants'].length;
    var asistentes="";

    for (i=0;i<numAttendees;i++){
        asistentes+=myEvent['attendants'][i]+'<br>';
    }
   
    return asistentes;
}




