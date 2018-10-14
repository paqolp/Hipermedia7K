// Necesita jQuery y la wea de las cookies

const ControladorEvento = (function() {
    $(function() {
        Eventos = getCookie("eventos");
        TiposEvento = getCookie("tiposEvento");
        if (!Eventos) {
            $.getJSON("data/Eventos.json", function(data) {
                Eventos = data;
                setCookie("eventos", Eventos, 365); // Un año de expiración alvvvv 
            });
        
            $.getJSON("data/TiposEvento.json", function(data) {
                TiposEvento = data;
                setCookie("tiposEvento", TiposEvento, 365);
            });
        }
    });

    let Eventos = [];
    let TiposEvento = [];

    // A partir de aquí empieza la clase uwu
    function ControladorEvento() { }

    ControladorEvento.prototype.obtenerTipos = function() {
        return TiposEvento;
    };

    ControladorEvento.prototype.obtener = function(id = null) {
        if (!id) { // Pos todos los productos siono
            return Eventos;
        } else {
            return Eventos.find(function(evento) { return evento.id == id });
        }
    };

    ControladorEvento.prototype.agregar = function(evento) {
        Eventos.push(evento);
        setCookie("eventos", Eventos, 365);
        return Eventos;
    };

    ControladorEvento.prototype.eliminar = function(id) {
        const idEliminar = Eventos.findIndex(function(evento) { return evento.id == id } );
        delete Eventos[idEliminar];
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    ControladorEvento.prototype.modificar = function(id, nuevo) {
        const idModificar = Eventos.findIndex(function(evento) { return evento.id == id } );
        Evento[idModificar] = nuevo;
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    return ControladorEvento;
})();
