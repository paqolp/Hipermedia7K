function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
  
var event = getUrlVars()['event'].toString();
var myEvent = JSON.parse(decodeURI(event));


// var jsonEvents='[{"name":"Nombre Evento Prueba1", "date":"2018-10-12", "hour":"20:00", "address":"Dirección evento 1", "host":"Organizador del evento 1", "desc":"Descripción1", "qtyAttend":10, "attendants": ["Manuel Sánchez","Roberto Jiménez"], "imgPlace":["https://www.ecestaticos.com/imagestatic/clipping/a0a/d98/a0ad98dc552223bc3e12e4f0c5cb91d9/por-que-es-mejor-que-viajemos-en-tren-en-lugar-de-en-avion.jpg?mtime=1500895657","https://media-cdn.tripadvisor.com/media/photo-s/07/f2/86/49/increible-lugar-para.jpg"], "activities":["Nombre Actividad 1", "Nombre Actividad 2"]}]';
// var myEventse(jsonEvents);
// var numeroEvento=0;
document.body.onload=setEventDetails();


function setEventDetails() {
    document.getElementById("eventName").value = myEvent['name'];
    document.getElementById("eventDescription").innerHTML = myEvent['desc'];
    document.getElementById("eventOrganizer").value = myEvent['host'];
    document.getElementById("eventAddress").value = myEvent['address'];
    document.getElementById("eventDate").value = myEvent['date'];
    document.getElementById("eventTime").value = myEvent['hour'];
    document.getElementById("numEventAttendees").value = myEvent['qtyAttend'];
    document.getElementById("event-images").innerHTML= setImages();
    document.getElementById("event-activities").innerHTML = setActivities();
    document.getElementById("event-attendees").innerHTML = setAttendees();
}

function setImages(){
    var numImagenes=  myEvent.imgPlace.length;
    var imagenes='';

    for (i=0;i<numImagenes;i++){
        imagenes+='<div class="event-detail">';
        imagenes+='<input type="text" name="eventImages" value="'+myEvent.imgPlace[i]+'">'
        imagenes+='<button class="btn btnDeleteImage"><span class="lnr lnr-trash"></span></button>';
        imagenes+='</div>';
    }
    return imagenes;
}

function setActivities(){
    var numActivities=  myEvent['activities'].length;
    var actividades='';

    for (i=0;i<numActivities;i++){
        actividades+='<div class="event-detail">';
        actividades+='<input type="text" name="eventActivity" value="'+myEvent.activities[i]+'">';
        actividades+='<button class="btn btnDeleteActivity"><span class="lnr lnr-trash"></span></button>';
        actividades+='</div>';
    }

    actividades+='</div>';
    
    return actividades;
}

function setAttendees(){
    var numAttendees=  myEvent['attendants'].length;
    var asistentes="";

    for (i=0;i<numAttendees;i++){
        asistentes+='<div class="event-detail">';
        asistentes+='<input type="text" name="eventAttendees" value="'+myEvent.attendants[i]+'">';
        asistentes+='<button class="btn btnDeleteAttendee"><span class="lnr lnr-trash"></span></button>';
        asistentes+='</div>';
    }
   
    return asistentes;
}

function moreImages(){
    var imagenes=document.getElementById("event-images").innerHTML;
    var images='<div class="event-detail">';
        images+='<input type="text" name="eventImages">';
        images+='<button class="btn btnDeleteImages"><span class="lnr lnr-trash"></span></button>';
        images+='</div>';

        document.getElementById("event-images").innerHTML= imagenes+images;
}

function moreAttendees(){
    var attendants=document.getElementById("event-attendees").innerHTML;
    var attendees='<div class="event-detail">';
        attendees+='<input type="text" name="eventAttendees">';
        attendees+='<button class="btn btnDeleteAttendee"><span class="lnr lnr-trash"></span></button>';
        attendees+='</div>';

        document.getElementById("event-attendees").innerHTML= attendants+attendees;
}

function moreActivities(){
    var activities=document.getElementById("event-activities").innerHTML;
    var actividades='<div class="event-detail">';
        actividades+='<input type="text" name="eventActivity">';
        actividades+='<button class="btn btnDeleteActivity"><span class="lnr lnr-trash"></span></button>';
        actividades+='</div>';

        document.getElementById("event-activities").innerHTML= activities+actividades;
}

function save(){
    var myString = '{"name":"' + document.getElementById("eventName").value + '",';
    myString += '"date":"' + document.getElementById("eventDate").value + '",';
    myString += '"hour":"' + document.getElementById("eventTime").value + '",';
    myString += '"address":"' + document.getElementById("eventAddress").value + '",';
    myString += '"host":"' + document.getElementById("eventOrganizer").value + '",';
    myString += '"desc":"' + document.getElementById("eventDescription").value + '",';
    myString += '"qtyAttend":"' + document.getElementById("numEventAttendees").value + '",';
    
    myString += '"imgPlace":[' + getImages() + '],';
    myString += '"activities":[' + getActivities() + '],';
    myString += '"attendants":[' + getAttendees() + ']}';

    // alert(myString);
    window.open('event-details.html?event=' + myString, '_blank');
}

function getImages(){
    var arrImg = document.getElementsByName("eventImages");
    var numImagenes = arrImg.length;

    var imagenes='';

    for (i=0;i<numImagenes;i++){
        imagenes += '"' + arrImg[i].value + '"';
        if(i != numImagenes - 1){
            imagenes += ',';
        }
    }
    return imagenes;
}

function getActivities(){
    var arrImg = document.getElementsByName("eventActivity");
    var numImagenes = arrImg.length;

    var imagenes='';

    for (i=0;i<numImagenes;i++){
        imagenes += '"' + arrImg[i].value + '"';
        if(i != numImagenes - 1){
            imagenes += ',';
        }
    }
    return imagenes;
}

function getAttendees(){
    var arrImg = document.getElementsByName("eventAttendees");
    var numImagenes = arrImg.length;

    var imagenes='';

    for (i=0;i<numImagenes;i++){
        imagenes += '"' + arrImg[i].value + '"';
        if(i != numImagenes - 1){
            imagenes += ',';
        }
    }
    return imagenes;
}
