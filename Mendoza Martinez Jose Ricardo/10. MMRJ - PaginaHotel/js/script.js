/*function HojaUno(){
var sheets = document.getElementsByTagName("link");
var style1 = sheets[3];
var sheetParent = style1.parentNode;
sheetParent.removeChild(style1);

}

function HojaDos(){
    
}

function HojaTres(){
    
}*/

var Hoja = document.createElement('style');
function Agrega(){
    Hoja.innerHTML = 
    ".navbar {border: 2px solid black;} .testimonials { background-color:#285418; color:white;} .showcase{color:#285418;} ";
    document.body.appendChild(Hoja); 
}

function Agrega2(){
    Hoja.innerHTML = 
    ".navbar {border: 2px solid blue;} .testimonials { background-color:#007BFF; color:white;} .showcase{color:#007BFF;} ";
    document.body.appendChild(Hoja); 
}

function Remueve(){
    var sheetToBeRemoved = Hoja;
    var sheetParent = sheetToBeRemoved.parentNode;
    sheetParent.removeChild(sheetToBeRemoved);
}
