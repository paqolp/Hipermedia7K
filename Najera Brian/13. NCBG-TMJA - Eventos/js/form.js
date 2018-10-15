'use strict'

var name;
var place;
var day;
var month;
var activity;
var asist;
var descripcion;

function obtenerValor(id)
{

  name =document.getElementById("event"+id).value;
  place =document.getElementById("place"+id).innerText;
  day =document.getElementById("day"+id).innerText;
  month =document.getElementById("month"+id).innerText;
  activity =document.getElementById("activity"+id).innerText;
  asist =document.getElementById("asist"+id).innerText;
  descripcion =document.getElementById("descripcion"+id).innerText;
  localStorage.setItem("name",name);
  localStorage.setItem("place",place);
  localStorage.setItem("day",day);
  localStorage.setItem("month",month);
  localStorage.setItem("descripcion",descripcion);
  window.location="Evento.html"
 }
