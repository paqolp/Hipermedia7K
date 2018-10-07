function loadJSON(fileName, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', `../js/${fileName}.json`, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
}

function truncateText(limit, text) {
    const arrayWords = text.trim().split(' ');
    const arraySelectedWords = arrayWords.slice(0, limit);
    return arraySelectedWords.join(' ').concat('...');
}

const Tienda = (function() {
    function Tienda() {
        this.carrito = new Carrito();
        this.productos = [];
    }

    Tienda.prototype.obtenerProductos = function() {
        loadJSON('productos', (productos) => {
            this.productos = productos;
            this.mostrarProductos();
        });
    }

    Tienda.prototype.mostrarProductos = function() {
        const productosHtml = this.productos.map((producto) => {
            return this.generarProductoHtml(producto);
        }).join('');
        document.getElementById('productosContainer').innerHTML = productosHtml;
        this.agregarEventoProductos();
    }

    Tienda.prototype.generarProductoHtml = function(producto) {
        return `<div class="col-12 col-md-6 col-lg-3 my-2">
                    <div class="card">
                        <img class="card-img-top" src="${producto.imagen}" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${truncateText(10, producto.descripcion)}</p>
                            <button data-idProducto="${producto.id}" class="agregar-carrito btn btn-primary btn-sm">Agregar al carrito</button>
                        </div>
                    </div>
                </div>`;
    }

    Tienda.prototype.agregarEventoProductos = function() {
        const botonesAgregarCarrito = document.getElementsByClassName('agregar-carrito');
        Array.from(botonesAgregarCarrito).forEach((boton) => {
            const idProducto = boton.dataset.idproducto;
            boton.addEventListener('click', (e) => {
                this.carrito.setProductoCantidad(idProducto);
            });
        });
    }
    
    return Tienda;

})(); 

(function() {
    const tienda = new Tienda();
    tienda.obtenerProductos();
})();