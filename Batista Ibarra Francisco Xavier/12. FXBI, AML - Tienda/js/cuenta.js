const Cuenta = (function() {
    function Cuenta() {
        this.carrito = new Carrito();
        this.productos = [];
        this.obtenerProductos();
        this.total = 0;
    }

    Cuenta.prototype.obtenerProductos = function() {
        loadJSON('productos', (productos) => {
            this.productos = productos;
            this.mostrarProductos();
            this.calcularTotal();
        });
    }

    Cuenta.prototype.mostrarProductos = function() {
        let productosHtml = '';
        for(const idProducto in this.carrito.articulos) {
            const producto = this.productos.find((producto) => {
                if (producto.id == idProducto) {
                    return Object.assign(producto, {cantidad: this.carrito.articulos[idProducto]})
                }
            });
            productosHtml += this.generarProductoHtml(producto);
        }
        document.getElementById('productosContainer').innerHTML = productosHtml;
        this.agregarEventoProductos();
    }

    Cuenta.prototype.generarProductoHtml = function(producto) {
        return `<tr id="${producto.id}">
                    <th scope="row">
                        <img class="img-producto card-img-top" width="30" src="img/${producto.id}.jpg" alt="${producto.nombre}">
                    </th>
                    <td>
                        ${producto.nombre}
                        <br/>
                        $${Number(producto.precio).toFixed(2)}
                    </td>
                    <td>
                        <input data-idproducto="${producto.id}" data-precio="${producto.precio}" class="input-cantidad" type="number" value="${producto.cantidad}" min="1" max="100" />
                    </td>
                    <td id="total-${producto.id}">
                        ${Number(producto.precio*producto.cantidad).toFixed(2)}
                    </td>
                    <td>
                        <button data-idproducto="${producto.id}" class="btn-eliminar-producto btn btn-link"><i class="fas fa-times"></i></button>
                    </td>
                </tr>`;
    }

    Cuenta.prototype.agregarEventoProductos = function() {
        const botonesEliminarProducto = document.getElementsByClassName('btn-eliminar-producto');
        Array.from(botonesEliminarProducto).forEach((boton) => {
            const idProducto = boton.dataset.idproducto;
            boton.addEventListener('click', (e) => {
                this.carrito.setProductoCantidad(idProducto, 0);
                const trProducto = document.getElementById(idProducto);
                trProducto.parentNode.removeChild(trProducto);
                this.calcularTotal();
            });
        });
        const inputsCantidadProducto = document.getElementsByClassName('input-cantidad');
        Array.from(inputsCantidadProducto).forEach((input) => {
            input.addEventListener('change', (e) => {
                const idProducto = e.target.dataset.idproducto;
                const precioProducto = Number(e.target.dataset.precio);
                const cantidadProducto = Number(e.target.value);
                this.carrito.setProductoCantidad(idProducto, Number(cantidadProducto));
                document.getElementById(`total-${idProducto}`).innerText = (precioProducto*cantidadProducto).toFixed(2);
                this.calcularTotal();
            });
        });

        const frmDatosEnvio = document.getElementById('frmDatosEnvio');
        frmDatosEnvio.addEventListener("submit", (e) => {
            if(!isValid){
                e.preventDefault();
                this.carrito.vaciarCarrito();
            }
        });
    }

    Cuenta.prototype.calcularTotal = function() {
        const inputsCantidadProducto = document.getElementsByClassName('input-cantidad');
        this.total = 0;
        Array.from(inputsCantidadProducto).forEach((input) => {
            const precioProducto = Number(input.dataset.precio);
            const cantidadProducto = Number(input.value);
            const subtotal = Number(precioProducto*cantidadProducto);
            this.total += Number(subtotal);
        });
        document.getElementById('subtotal').innerText = this.total.toFixed(2);
        document.getElementById('total').innerText = (this.total + 150).toFixed(2);
    }
    
    return Cuenta;

})(); 

let cuenta = new Cuenta();