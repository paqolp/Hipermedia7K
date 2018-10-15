const events = document.querySelector('#div')
let templateEvent = ''
let templateEvent2 = ''
let eventos=[]
let eventsjson = 
[
  {"name":"Evento 1", "activities":"Muchas cosas", "place":"Colima", "date":"14/05/19", "imagen":{"first":"imagen1", "second":"imagen2", "third":"imagen3"}, "organizer":"Mily", "participants":"5"},
  {"name":"Evento 2", "activities":"Muchas cosas", "place":"Manzanillo", "date":"14/05/19", "imagen":{"first":"imagen1", "second":"imagen2", "third":"imagen3"}, "organizer":"Mily2", "participants":"3"},
  {"name":"Evento 3", "activities":"Muchas cosas", "place":"Mi casa", "date":"14/05/19", "imagen":{"first":"imagen1", "second":"imagen2", "third":"imagen3"}, "organizer":"Mily3", "participants":"40"},
  {"name":"Evento 4", "activities":"Muchas cosas", "place":"Mi casa", "date":"14/05/19", "imagen":{"first":"imagen1", "second":"imagen2", "third":"imagen3"}, "organizer":"Mily3", "participants":"10"}
]
$(document).ready(function () 
{
  for (let a = 0; a < eventsjson.length; a++) 
      {
        templateEvent += 
        `<div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100 mt-5">
            <div class="card-body">
              <h5 class="card-title text-center">
                Evento
              </h5>
              <h6>Nombre del evento: ${eventsjson[a].name} </h6>
              <h6>Lugar del evento: ${eventsjson[a].place} </h6>
              <h6>Participantes: ${eventsjson[a].participants} </h6>
              <h6>Organizador: ${eventsjson[a].organizer} </h6>
            </div>
          </div>
        </div>`
      }
      events.innerHTML = templateEvent
})

document.getElementById('form').addEventListener('submit', (e) => {
  let name = document.getElementById('name').value
  let activities = document.getElementById('activities').value
  let place = document.getElementById('place').value
  let date = document.getElementById('date').value
  let organizer = document.getElementById('organizer').value
  let number = document.getElementById('number').value
  // let image = document.getElementById('image').value
  createEvento(name, activities, place, date, organizer, number)
  e.preventDefault();
})
 
function createEvento(name, activities, place, date, organizer, number) {
  let evento = { name, activities, place, date, organizer, number }
  eventsjson.push(evento);
  console.log(evento)
  readEvento()
  document.getElementById('form').reset()
}
function readEvento() 
{
  
  for (let i = 0; i < eventsjson.length; i++) 
  {
    templateEvent2 += `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 mt-5">
        <div class="card-body">
          <h5 class="card-title text-center">
            Evento
          </h5>
          <h6>Nombre del evento: ${eventsjson[i].name} </h6>
          <h6>Lugar del evento: ${eventsjson[i].place} </h6>
          <h6>Participantes: ${eventsjson[i].number} </h6>
          <h6>Actividades: ${eventsjson[i].organizer} </h6>
        </div>
      </div>
    </div>`
  }
  events.innerHTML = templateEvent2
}