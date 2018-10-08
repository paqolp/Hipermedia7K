const Carrito = (function() {
    function Carrito() {
        try {
            this.articulos = JSON.parse(window.name);
            this.mostrarTotalCarrito();
        } catch (err) {
            this.vaciarCarrito();
        }
    }

    Carrito.prototype.setProductoCantidad = function(idProducto, cantidad = 1) {
        if (cantidad == 0) { // Si la cantidad es 0, lo sacamos del carrito
            delete this.articulos[idProducto];
        } else {
            this.articulos[idProducto] = cantidad;
        }
        window.name = JSON.stringify(this.articulos);
        this.mostrarTotalCarrito();
        return this.articulos;
    }

    Carrito.prototype.mostrarTotalCarrito = function() {
        document.getElementById('carrito-cantidad').innerHTML = Object.keys(this.articulos).length;
    }

    Carrito.prototype.vaciarCarrito = function() {
        this.articulos = { };
        window.name = "";
    }
    
    return Carrito;

})();