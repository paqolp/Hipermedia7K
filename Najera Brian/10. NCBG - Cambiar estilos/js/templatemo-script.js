
    var style2 = document.getElementById('estilo');
    var cont = 2;
    function estilo(){
      if(cont==1)
       {
           style2.href="css/templatemo-style-1.css";
           cont = 2;
       }else if (cont==2){
           style2.href="css/templatemo-style-2.css";
           cont = 3;
       }else{
       	style2.href="css/templatemo-style-3.css";
       	cont = 1;
       }
    }