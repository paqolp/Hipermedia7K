var estilo=2;

setInterval("cambiarEstilo()",2000);

function cambiarEstilo(){
    switch(estilo){
        case 1:
            document.getElementById('hojaEstilo').href="css/style1.css";
            estilo=2;
            break;
        case 2:
            document.getElementById('hojaEstilo').href="css/style2.css";
            estilo=3;
            break;
        case 3:
            document.getElementById('hojaEstilo').href="css/style3.css";
            estilo=1;
            break;
    }
}