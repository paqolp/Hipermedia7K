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
    // {
    //     name: "Kayak Outing on Lake Chapala", 
    //     date: "Monday, October 15 2018", 
    //     hour: "8:00 AM", 
    //     address: "Maria Isabel Restaurant, Ajijic, Jalisco", 
    //     host: "Lake Chapala Kayak Club",
    //     desc: "New members would be expected to be able to swim, be familiar with wearing a PFD, and have a general comfort level on the water from having some experience kayaking, canoeing, or sailing.",
    //     qtyAttend: 10,
    //     imgPlace: ["https://q-ec.bstatic.com/images/hotel/max1280x900/227/22795009.jpg", "https://www.ecestaticos.com/imagestatic/clipping/a0a/d98/a0ad98dc552223bc3e12e4f0c5cb91d9/por-que-es-mejor-que-viajemos-en-tren-en-lugar-de-en-avion.jpg?mtime=1500895657","https://media-cdn.tripadvisor.com/media/photo-s/07/f2/86/49/increible-lugar-para.jpg"],
    //     activities: ["Actividad 1", "Actividad 2"],
    //     attendants: ["Manuel Sánchez","Roberto Jiménez"]
    //   }
      //{%22name%22:%22Kayak%20Outing%20on%20Lake%20Chapala%22,%22date%22:%22Monday,%20October%2015%202018%22,%22hour%22:%228:00%20AM%22,%22address%22:%22Maria%20Isabel%20Restaurant,%20Ajijic,%20Jalisco%22,%22host%22:%22Lake%20Chapala%20Kayak%20Club%22,%22desc%22:%22New%20members%20would%20be%20expected%20to%20be%20able%20to%20swim,%20be%20familiar%20with%20wearing%20a%20PFD,%20and%20have%20a%20general%20comfort%20level%20on%20the%20water%20from%20having%20some%20experience%20kayaking,%20canoeing,%20or%20sailing.%22,%22qtyAttend%22:10,
      //%22imgPlace%22:[%22https://www.ecestaticos.com/imagestatic/clipping/a0a/d98/a0ad98dc552223bc3e12e4f0c5cb91d9/por-que-es-mejor-que-viajemos-en-tren-en-lugar-de-en-avion.jpg?mtime=1500895657%22,%22https://media-cdn.tripadvisor.com/media/photo-s/07/f2/86/49/increible-lugar-para.jpg%22],%22activities%22:[%22Actividad%201%22,%22Actividad%202%22],%22attendants%22:[%22Manuel%20S%C3%A1nchez%22,%22Roberto%20Jim%C3%A9nez%22]}
    var myString = '{"name":"' + document.getElementById("eventName").value + '",';
    myString += '"date":"' + document.getElementById("eventDate").value + '",';
    myString += '"hour":"' + document.getElementById("eventTime").value + '",';
    myString += '"address":"' + document.getElementById("eventAddress").value + '",';
    myString += '"host":"' + document.getElementById("eventOrganizer").value + '",';
    myString += '"desc":"' + document.getElementById("eventDescription").value + '",';
    myString += '"qtyAttend":"' + document.getElementById("numEventAttendees").value + '",';
    
    myString += '"imgPlace":["' + getImages() + '"],';
    myString += '"activities":["' + getActivities() + '"],';
    myString += '"attendants":["' + getAttendees() + '"]}';

    alert(myString);
    window.open('event-details.html?event=' + myString, '_blank');
}

function getImages(){
    var arrImg = document.getElementsByName("eventImages");
    var numImagenes = arrImg.length;

    var imagenes='';

    for (i=0;i<numImagenes;i++){
        if(i == 0 && i != numImagenes - 1){
            imagenes+= arrImg[i].value;
        }
        else if(i == 0){
            imagenes+= arrImg[i].value + '",';
        }
        else if (i == numImagenes - 1){
            imagenes+= '"' + arrImg[i].value;
        }
        else{
            imagenes+= '"' + arrImg[i].value + '",';
        }
    }
    return imagenes;
}

function getActivities(){
    var arrImg = document.getElementsByName("eventActivity");
    var numImagenes = arrImg.length;

    var imagenes='';

    for (i=0;i<numImagenes;i++){
        if(i == 0 && i != numImagenes - 1){
            imagenes+= arrImg[i].value;
        }
        else if(i == 0){
            imagenes+= arrImg[i].value + '",';
        }
        else if (i == numImagenes - 1){
            imagenes+= '"' + arrImg[i].value;
        }
        else{
            imagenes+= '"' + arrImg[i].value + '",';
        }
    }
    return imagenes;
}

function getAttendees(){
    var arrImg = document.getElementsByName("eventAttendees");
    var numImagenes = arrImg.length;

    var imagenes='';

    for (i=0;i<numImagenes;i++){
        if(i == 0 && i != numImagenes - 1){
            imagenes+= arrImg[i].value;
        }
        else if(i == 0){
            imagenes+= arrImg[i].value + '",';
        }
        else if (i == numImagenes - 1){
            imagenes+= '"' + arrImg[i].value;
        }
        else{
            imagenes+= '"' + arrImg[i].value + '",';
        }
    }
    return imagenes;
}
