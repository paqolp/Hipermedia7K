window.onload = function() {
  // Variables
  let listaProductos = [
	  {
	    id: 1,
	    nombre: 'Tarola EE',
	    descripcion: 'Edición especial The Black Page.',
	    precio: 1000,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 2,
	    nombre: 'Estuche',
	    descripcion: 'Práctico estuche para tarola.',
	    precio: 350,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 3,
	    nombre: 'Tarola versión Rumours',
	    descripcion: 'Elegante opción para tocar.',
	    precio: 1500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 4,
	    nombre: 'Tarola Josh',
	    descripcion: 'Toca al estilo Josh.',
	    precio: 1200,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 5,
	    nombre: 'Toms EE',
	    descripcion: 'Edición especial toms.',
	    precio: 2000,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 6,
	    nombre: 'Tarola Azul Mate',
	    descripcion: 'Diversión y estilo.',
	    precio: 1100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 7,
	    nombre: 'Tarola Elegance',
	    descripcion: 'Elegancia y estilo.',
	    precio: 1450,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 8,
	    nombre: 'Tarola OSJC',
	    descripcion: 'Un color para un estilo diferente.',
	    precio: 800,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 9,
	    nombre: 'Tarola Classic',
	    descripcion: 'Para un toque clásico.',
	    precio: 900,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 10,
	    nombre: 'Tarola Vintage',
	    descripcion: 'Para un estilo vintage.',
	    precio: 1000,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 11,
	    nombre: 'Tarola Metal',
	    descripcion: 'Platinado para gustos distintos.',
	    precio: 1120,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 12,
	    nombre: 'Tarola Mate',
	    descripcion: 'El mejor de todos.',
	    precio: 1600,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 13,
	    nombre: 'Tarola EE Black',
	    descripcion: 'Para un gusto distinto.',
	    precio: 1500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 14,
	    nombre: 'Tarola C&C',
	    descripcion: 'Edición cookies & cream.',
	    precio: 1200,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 15,
	    nombre: 'Drum Kit',
	    descripcion: 'Equipo básico café mate.',
	    precio: 3500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 16,
	    nombre: 'Drum Kit Complete',
	    descripcion: 'Equipo completo café mate.',
	    precio: 3850,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 17,
	    nombre: 'Tom de piso',
	    descripcion: 'Cómodo y clásico.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 18,
	    nombre: 'Complete hardware',
	    descripcion: 'Equipo para platillos, banco y pedal.',
	    precio: 950,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 19,
	    nombre: 'Tom 10',
	    descripcion: 'Tambor 1 color rojo.',
	    precio: 600,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 20,
	    nombre: 'Classic Drum Kit',
	    descripcion: 'Equipo clásico.',
	    precio: 2900,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 21,
	    nombre: 'Aqua Drum Kit',
	    descripcion: 'Equipo básico color aqua.',
	    precio: 2940,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 22,
	    nombre: 'Drum Kit',
	    descripcion: 'Equipo básico color naranja.',
	    precio: 2500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 23,
	    nombre: 'Luke Holland Edition',
	    descripcion: 'Toca como los profesionales.',
	    precio: 3900,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 24,
	    nombre: 'Tom 2',
	    descripcion: 'Tambor profundo.',
	    precio: 550,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 25,
	    nombre: 'Tom de piso',
	    descripcion: 'Negro/rojo.',
	    precio: 450,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 26,
	    nombre: 'Tom de piso',
	    descripcion: 'Aqua edition.',
	    precio: 450,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 27,
	    nombre: 'Classic Tom',
	    descripcion: 'Tom clásico naranja old.',
	    precio: 400,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 28,
	    nombre: 'Tom 2',
	    descripcion: 'Profundo y clásico.',
	    precio: 500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 29,
	    nombre: 'Classic Elegant',
	    descripcion: 'Tom 1 color azul y dorado',
	    precio: 600,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 30,
	    nombre: 'Parche SJC',
	    descripcion: 'Parche para tarola.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 31,
	    nombre: 'Parche Minimal',
	    descripcion: 'Parche sin diseño.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 32,
	    nombre: 'Parche',
	    descripcion: 'Parche para tarola con diseño.',
	    precio: 130,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 33,
	    nombre: 'Banco SJC',
	    descripcion: 'Lo más cómodo para tocar.',
	    precio: 760,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 34,
	    nombre: 'Kit Primeros Auxilios',
	    descripcion: 'Repuestos para equipo.',
	    precio: 400,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 35,
	    nombre: 'Montaje para tambor',
	    descripcion: 'Ajustable.',
	    precio: 1200,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 36,
	    nombre: 'Soporte de montaje',
	    descripcion: 'Variedad de colores.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id:37,
	    nombre: 'Tornillos y arandelas',
	    descripcion: 'Repuestos',
	    precio: 140,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 38,
	    nombre: 'Varillas de tensión',
	    descripcion: 'Para todo tipo de tambor.',
	    precio: 200,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 39,
	    nombre: 'Tensores',
	    descripcion: 'Doble terminación.',
	    precio: 170,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 40,
	    nombre: 'Parche 10',
	    descripcion: 'Silenciador 10 pulgadas.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 41,
	    nombre: 'Parche 12',
	    descripcion: 'Silenciador 12 pulgadas.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 42,
	    nombre: 'Parche 13',
	    descripcion: 'Silenciador 13 pulgadas.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 43,
	    nombre: 'Parche 15',
	    descripcion: 'Silenciador 15 pulgadas.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 44,
	    nombre: 'Kit Parches',
	    descripcion: 'Kit completo de silenciadores',
	    precio: 500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 45,
	    nombre: 'Audífonos',
	    descripcion: 'Protege tus oídos. Color negro.',
	    precio: 1500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 46,
	    nombre: 'Audífonos',
	    descripcion: 'Protege tus oídos. Color azul.',
	    precio: 1500,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 47,
	    nombre: 'Porta baquetas',
	    descripcion: 'Básico para conciertos.',
	    precio: 740,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 48,
	    nombre: 'Porta baquetas',
	    descripcion: 'Ultra práctico.',
	    precio: 100,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 49,
	    nombre: 'Maletín',
	    descripcion: 'Lleva tus repuestos y baquetas a donde sea.',
	    precio: 990,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  },
	  {
	    id: 50,
	    nombre: 'Mochila',
	    descripcion: 'Para guardar todo lo que necesites.',
	    precio: 1900,
	    resenia: {
	      calificacion: 10,
	      coment: 'Excelente producto y con la mejor calidad.',
	      autor: 'Luke Holland'
	    }
	  }
	]
  let $items = document.querySelector('#elementos');
  let carrito = [];
  let total = 0;
  let $carrito = document.querySelector('#carrito');
  let $total = document.querySelector('#total');
  
  function mostrarProductos() {
    for (let datos of listaProductos) {
      // Contenedor
      let contenedor = document.createElement('div');
      contenedor.classList.add('col-sm-4', 'my-2');
      // Creación de div 'card'
      let card = document.createElement('div');
      card.classList.add('card');
      // Imagen del producto
      let imgProd = document.createElement('img');
      imgProd.classList.add('card-img-top', 'mx-auto', 'mt-2');
      imgProd.setAttribute('src', 'img/' + datos['id'] + '.jpg');
      // Contenido de 'card'
      let contCard = document.createElement('div');
      contCard.classList.add('card-body');
      // Nombre del producto
      let nombreProd = document.createElement('h5');
      nombreProd.classList.add('card-title');
      nombreProd.textContent = datos['nombre'];
      // Descripcion del producto
      let descProd = document.createElement('p');
      descProd.classList.add('card-text');
      descProd.textContent =datos['descripcion'];
      // Precio del producto
      let precioProd = document.createElement('p');
      precioProd.textContent = '$' + datos['precio'] + '.00';
      // Reseña - Autor
      let rAutor = document.createElement('p');
      rAutor.classList.add('small', 'my-1', 'r-autor');
      rAutor.textContent = datos['resenia']['autor'];
      // Reseña - Comentario
      let rCom = document.createElement('p');
      rCom.classList.add('small', 'my-1', 'r-com');
      rCom.textContent = datos['resenia']['coment'];
      // Reseña - Calificación
      let rCalif = document.createElement('p');
      rCalif.classList.add('small', 'mb-3', 'r-calif');
      rCalif.textContent = 'Calificación: ' + datos['resenia']['calificacion'];
      // Boton para agregar al carrito. Se agrega uno a la vez
      let agregarProd = document.createElement('button');
      agregarProd.classList.add('btn', 'btn-outline-secondary', 'btn-sm', 'btn-x');
      agregarProd.textContent = '+';
      agregarProd.setAttribute('marcador', datos['id']);
      agregarProd.addEventListener('click', agregarProducto);
      
      
      contCard.appendChild(nombreProd);
      contCard.appendChild(descProd);
      contCard.appendChild(precioProd);
      contCard.appendChild(rAutor);
      contCard.appendChild(rCom);
      contCard.appendChild(rCalif);
      contCard.appendChild(agregarProd);
      card.appendChild(imgProd);
      card.appendChild(contCard);
      contenedor.appendChild(card);
      $items.appendChild(contenedor);
    }
  }

  function agregarProducto() {
    // Se agrega el id del producto al carrito
    carrito.push(this.getAttribute('marcador'))
    // Se calcula el total de la compra
    calcularTotal();
    // Se muestran los productos agregados al carrito 
    mostrarCarrito();
  }

  function mostrarCarrito() {
    // Se reestablece el HTML para vaciar el carrito
    $carrito.textContent = '';
    
    carrito.forEach(function (elem, indice) {
      // Se obtiene el elemento que necesitamos de la variable base de datos
      let producto = listaProductos.filter(function(elemLista) {
          return elemLista['id'] == elem;
      });
      // Se crea la lista para el carrito
      let listaProd = document.createElement('li');
      listaProd.classList.add('list-group-item');
      // Listado
      let listaCarrito = document.createElement('p');
      listaCarrito.classList.add('mr-2');
      listaCarrito.textContent = `${producto[0]['nombre']} - \$ ${producto[0]['precio']}.00`;
      // Boton para borrar del carrito
      let eliminarProd = document.createElement('button');
      eliminarProd.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'btn-x', 'border-0', 'text-danger', 'float-right');
      eliminarProd.textContent = 'x';
      eliminarProd.setAttribute('posicion', indice);
      eliminarProd.addEventListener('click', eliminarProducto);
      

      listaCarrito.appendChild(eliminarProd);
      listaProd.appendChild(listaCarrito);
      $carrito.appendChild(listaProd);
    })
  }

  function eliminarProducto() {
    // Se obtiene la posición del producto
    let posicion = this.getAttribute('posicion');
    // Se elimina la posición seleccionada
    carrito.splice(posicion, 1);
    // Se muestra el La lista del carrito
    mostrarCarrito();
    // Se calcula el total de la compra
    calcularTotal();
  }

  function calcularTotal() {
    total = 0;
    
    for (let elem of carrito) {
      // Se obtiene el precio de cada elemento del carrito
      let producto = listaProductos.filter(function(elemLista) {
          return elemLista['id'] == elem;
      });
      total = total + producto[0]['precio'];
    }
    
    let totalDosDecimales = total.toFixed(2);
    // Muestra total
    $total.textContent = totalDosDecimales;
  }

  mostrarProductos();
} 