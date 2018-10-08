'use strict'
function validacion()
{
  var usuario=document.getElementById('inputEmail');
  var contra=document.getElementById('inputPassword');
  if (usuario.value=="jtorres24@ucol.mx")
  {
    if (contra.value=="hola")
    {
      document.form.submit(); 
    }

  }
  else
  {
    alert("ingrese bien sus credenciales");

  }
}

// function pagina(pag)
// {
//   document.form.action = pag+'.html';
//   document.form.submit();
// }
