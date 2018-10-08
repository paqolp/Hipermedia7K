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
        return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
                    <div class="card">
                        <div class="div-img-producto" data-toggle="modal" data-target="#modalProducto" data-idProducto="${producto.id}">
                            <img class="img-producto card-img-top" src="img/${producto.id}.jpg" alt="${producto.nombre}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${truncateText(10, producto.descripcion)}</p>
                            <b class="precio">$${Number(producto.precio).toFixed(2)}</b>
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
        const divsImagenProducto = document.getElementsByClassName('div-img-producto');
        Array.from(divsImagenProducto).forEach((div) => {
            div.addEventListener('click', (e) => {
                const idProducto = e.target.dataset.idproducto;
                const producto = this.productos.find(function(producto) {
                    return producto.id == idProducto;
                });
                this.mostrarModalProducto(producto);
            });
        });
    }

    Tienda.prototype.mostrarModalProducto = function(producto) {
        const resenias = producto.resenias.map((resenia) => {
            const estrellasHtml = this.generarEstrellasHtml(resenia.calificacion);
            return `<div class="media">
                        <div class="media-body">
                            <h5 class="mt-0">${resenia.autor} - ${estrellasHtml}</h5>
                            <p>${resenia.comentario}</p>
                        </div>
                    </div>`;
        }).join('');
        const innerModal =  `<div class="modal-header">
                                <h5 class="modal-title" id="modalProductoLabel">${producto.nombre}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <img src="img/${producto.id}.jpg" alt="${producto.nombre}" class="img-thumbnail">
                                    </div>
                                    <div class="col-12 col-md-8">
                                        <p class="card-text">${producto.descripcion}</p>
                                        <b class="precio">$${Number(producto.precio).toFixed(2)}</b>
                                        <button onclick="tienda.carrito.setProductoCantidad(${producto.id})" data-idProducto="${producto.id}" class="agregar-carrito btn btn-primary btn-sm">Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                ${resenias}
                            </div>`;
        document.getElementById('modalProductoContenido').innerHTML = innerModal;
    }

    Tienda.prototype.generarEstrellasHtml = function(calificacion) {
        let estrellasHtml = '';
        for(let i = 0; i < calificacion; i++) {
            estrellasHtml += `<i class="fas fa-star text-warning"></i>`;
        }
        return estrellasHtml;
    }
    
    return Tienda;

})(); 

let tienda = new Tienda();
tienda.obtenerProductos();