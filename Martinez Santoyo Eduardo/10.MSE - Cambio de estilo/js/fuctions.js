function changeCSS(sheet) 
{
  if(document.getElementById('css').getAttribute("href") == "/css/style1.css")
  {
    sheet = '/css/style2.css';
  }
  else if(document.getElementById('css').getAttribute("href") == "/css/style2.css")
  {
    sheet = '/css/style3.css';
  }
  else if(document.getElementById('css').getAttribute("href") == "/css/style3.css"){
    sheet = '/css/style1.css';
  }
  document.getElementById('css').setAttribute('href', sheet);
}