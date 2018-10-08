;
((c, d, ajax, j) => {
  const movies = d.querySelector('.movies')
  var informacion

  c('JSON.stryngify()',
    'JSON.parce()')

  ajax.open('GET', './js/movies.json', true)
  ajax.addEventListener('load', e => {
    let moviesInfo
    let moviesTemplate = ''

    if (ajax.status >= 200 && ajax.status < 400) {
      moviesInfo = j.parse(ajax.responseText)
      c(moviesInfo, moviesInfo['movies'])
      informacion = moviesInfo['movies']
      moviesInfo['movies'].map(movie => {
        moviesTemplate += 
        `<div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <img class="card-img-top miniatura mx-auto d-block mt-1 movie-card" src="${movie.imagen}" alt="Imagen de Película">
              <div class="card-body">
                <h5 class="card-title text-center">
                  <a class="movie-title movie-card" href="#" data-toggle="modal" data-target="#exampleModal">${movie.titulo}</a>
                </h5>
                <h6>Precio: ${movie.precio}</h6>
                <h6>Director: ${movie.director}</h6>
              </div>
              <div class="card-footer">
                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
              </div>
            </div>
          </div>`
      })
    } else {
      moviesTemplate = `<b>El servidor No responde. Erro N° ${ajax.status}: <mark>${ajax.statusText}</mark></b>`
    }

    movies.innerHTML = moviesTemplate
  })
  ajax.send()
  d.addEventListener('click', e => {
    // e.preventDefault()
    if(e.target.matches('.movie-card'))
    {
      let modal = d.querySelector('.pelis')
      informacion.map(movie => {
        if(e.target.firstChild.data == movie.titulo)
        {
          let contenidoTemplate = `
          <img class="card-img-top miniatura mx-auto d-block mt-1 movie-details" src="${movie.imagen}" alt="Imagen de Película">
          <h6 class="mt-3">Título: ${movie.titulo}</h6>
          <h6>Precio: ${movie.precio}</h6>
          <h6>Año: ${movie.anio}</h6>
          Clasificación: <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
          `
          // console.log(modal)
          modal.innerHTML = contenidoTemplate;
        }
      })
    }
  })

})(console.log, document, new XMLHttpRequest, JSON)

let value = 0
function incrementValue()
{
  value += 1
  // console.log(value)
  document.getElementById('number').text = `Carrito (${value})`
}

