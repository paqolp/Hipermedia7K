var myWindow;
    function openWin() {
        myWindow = window.open("pagina1.html", "", "width=400 ,height=200");
        document.getElementById("demo").innerHTML = document.lastModified;
    }
    function closeWin() {
        if (myWindow) {
            myWindow.close();
        }
    }
    function checkWin() {
        msg = ""
        if (!myWindow) {
            msg = "was never opened";
        } else { 
            if (myWindow.closed) { 
                msg = "is closed";
            } else {
                msg = "is open";
            }
        
        }
        document.getElementById("msg").innerHTML = 
        "myWindow " + msg;
    }

var fechaModificacion;
    function fecha() {
    document.getElementById("demo").innerHTML = document.lastModified;
}