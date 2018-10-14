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
        if (Eventos.length == 0) {
            evento.id = 0;
        } else {
            evento.id = Eventos[Eventos.length - 1].id + 1;
        }
        Eventos.push(evento);
        setCookie("eventos", Eventos, 365);
        return Eventos;
    };

    ControladorEvento.prototype.eliminar = function(id) {
        Eventos = Eventos.filter(function(evento) { return evento.id != id } );
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    ControladorEvento.prototype.modificar = function(id, nuevo) {
        const idModificar = Eventos.findIndex(function(evento) { return evento.id == id } );
        nuevo.id = idModificar;
        Eventos[idModificar] = nuevo;
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    ControladorEvento.prototype.agregarAsistente = function(idEvento, asistente) {
        const indexEvento = Eventos.findIndex(evento => evento.id == idEvento);
        const Evento = Eventos[indexEvento];
        asistente.id = Evento.asistentes[Evento.asistentes.length - 1].id + 1;
        Evento.asistentes.push(asistente);
        Eventos[indexEvento] = Evento;
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    ControladorEvento.prototype.eliminarAsistente = function(idEvento, idAsistente) {
        const indexEvento = Eventos.findIndex(evento => evento.id == idEvento);
        const Evento = Eventos[indexEvento];
        Evento.asistentes = Evento.asistentes.filter(asistente => asistente.id != idAsistente)
        Eventos[indexEvento] = Evento;
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    ControladorEvento.prototype.agregarActividad = function(idEvento, actividad) {
        const indexEvento = Eventos.findIndex(evento => evento.id == idEvento);
        const Evento = Eventos[indexEvento];
        actividad.id = Evento.actividades[Evento.actividades.length - 1].id + 1;
        Evento.actividades.push(actividad);
        Eventos[indexEvento] = Evento;
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    ControladorEvento.prototype.eliminarActividad = function(idEvento, idActividad) {
        const indexEvento = Eventos.findIndex(evento => evento.id == idEvento);
        const Evento = Eventos[indexEvento];
        Evento.actividades = Evento.actividades.filter(actividad => actividad.id != idActividad)
        Eventos[indexEvento] = Evento;
        setCookie("eventos", Eventos, 365);
        return Eventos;
    }

    return ControladorEvento;
})();
