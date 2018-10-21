function abrirVentana() {
    window.open("https://www.google.com","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=600");
}

function agregar() {
    var nv = window.open();
    nv.document.open();
    nv.document.write("<h2>Esto fue con DOM!</h2>");
    nv.document.close();
}