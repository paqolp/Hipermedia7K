setImages();
setActivities();
setAttendees();

function setImages(){
    var numImagenes=  1;
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
    var numActivities=  1;
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
    var numAttendees= 1;
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