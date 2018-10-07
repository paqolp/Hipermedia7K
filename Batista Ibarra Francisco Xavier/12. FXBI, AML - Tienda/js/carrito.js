// Ocupa la wea de las cookies

const Carrito = (function() {
    function Carrito() {
        try {
            this.articulos = JSON.parse(window.name);
        } catch (err) {
            this.articulos = { };
            window.name = "";
        }

        if (this.articulos == null) {
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

        return this.articulos;
    }

    Carrito.prototype.vaciarCarrito = function() {
        this.articulos = { };
        window.name = "";
    }
    
    return Carrito;

})();