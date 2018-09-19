var index = 0;
var styleSheet = document.getElementById("changingstyles");
var styles = ["css/styleuno.css", "css/styledos.css", "css/styletres.css"];
function change(){ 
    if(index == 2){
        index = 0;
    }
    else{
        index++;
    }
    styleSheet.href = styles[index];
}