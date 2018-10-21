let w;
function openwindow() 
{
    w = window.open('','', 'width=100,height=100');
    w.focus();
}

function myFunction() 
{
    w.resizeBy(50, 50);
    w.focus();
    w.document.open();
    w.document.write("<h2>Hello World!</h2>");
    w.document.close();
}
