const VistaEventos = (function() {
    function VistaEventos() {
        this.controladorEvento = new ControladorEvento();
        this.eventos = [];
        this.eventoAgregarEvento();
    }

    VistaEventos.prototype.eventoAgregarEvento = function() {
        $('#frmAgregarEvento').submit((frmAgregarEvento) => {
            frmAgregarEvento.preventDefault();
            const nombre = $('#nombreEvento').val();
            const organizador = $('#organizadorEvento').val();
            const direccion = $('#direccionEvento').val();
            const cupo = $('#cupoEvento').val();
            const idTipo = $('#tipoEvento').val();
            const tipo = this.controladorEvento.obtenerTipos()[idTipo - 1];
            const asistentes = [];
            const actividades = [];
            const evento = {nombre, organizador, direccion, cupo, tipo, asistentes, actividades};
            this.controladorEvento.agregar(evento);
            $('#crearEvento').modal('hide');
            this.obtenerEventos();
        })
    }

    VistaEventos.prototype.obtenerEventos = function() {
        this.controladorEvento.obtener(null, (eventos) => {
            this.eventos = eventos;
            this.mostrarEventos();
        });
    }

    VistaEventos.prototype.mostrarEventos = function() {
        const eventosHtml = this.eventos.map((evento) => {
            return this.generarEventoHtml(evento);
        }).join('');
        document.getElementById('eventosContainer').innerHTML = eventosHtml;
    }

    VistaEventos.prototype.generarEventoHtml = function(evento) {
        const { id, nombre } = evento;
        return `<div class="col-12 col-sm-6">
                    <div class="card my-2 text-center">
                        <a href="eventos.html" class="evento" onclick="setSessionStorageEvent(${id})">
                            <div class="card-body">
                            <h5>${nombre}</h5>
                            </div>
                        </a>
                    </div>
                </div>`;
    }

    return VistaEventos;

})(); 

function setSessionStorageEvent(id) {
    sessionStorage.setItem('idEvento', id); 
}

$(function() {
    let vistaEventos = new VistaEventos();
    vistaEventos.obtenerEventos();
});