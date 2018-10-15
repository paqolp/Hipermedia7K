const VistaEvento = (function() {
    function VistaEvento() {
        this.controladorEvento = new ControladorEvento();
        this.evento = {};
    }

    VistaEvento.prototype.obtenerEvento = function() {
        const idEvento = sessionStorage.getItem('idEvento');
        this.controladorEvento.obtener(idEvento, (evento) => {
            this.evento = evento;
            this.mostrarEvento();
        });
    }

    VistaEvento.prototype.mostrarEvento = function() {
        $.each(this.evento, (prop, val)=> {
            switch (prop) {
                case 'tipo':
                    this.mostrarTipoEvento();
                    break;
                case 'asistentes':
                    this.mostrarAsistentes();
                    break;
                case 'actividades':
                    this.mostrarActividades();
                    break;
                default:
                    $(`.${prop}`).text(val).val(val);
                    break;
            }
        });
        this.cargarImagenes();
        this.eventoEditarEvento();
        this.eventoAgregarAsistente();
        this.eventoAgregarActividad();
    }

    VistaEvento.prototype.mostrarTipoEvento = function() {
        const { id, nombre } = this.evento.tipo;
        $('#tipoEvento').val(id);
        $('.tipo').text(nombre);
    }

    VistaEvento.prototype.mostrarAsistentes = function() {
        const asistentesHtml = this.evento.asistentes.map((asistente) => {
            return this.generarAsistenteHtml(asistente);
        }).join('');
        $('#listaAsistentes').html(asistentesHtml);
        this.eventoEliminarAsistente();
    }

    VistaEvento.prototype.mostrarActividades = function() {
        const actividadesHtml = this.evento.actividades.map((actividad) => {
            return this.generarActividadHtml(actividad);
        }).join('');
        $('#listaActividades').html(actividadesHtml);
        this.eventoEliminarActividad();
    }

    VistaEvento.prototype.generarAsistenteHtml = function(asistente) {
        const { id, correo, nombre } = asistente;
        return `<li class="list-group-item g-flex justify-content-between align-items-center">
                    <span>
                        ${nombre}
                        <small>(${correo})</small>
                    </span>
                    <button data-id-asistente="${id}" class="btn-eliminar-asistente btn btn-sm btn-outline-danger float-right text-danger">
                        <i class="fas fa-times"></i>
                    </button>
                </li>`;
    }

    VistaEvento.prototype.generarActividadHtml = function(actividad) {
        const { id, descripcion, fechaHora, lugar, nombre } = actividad;
        return `<div class="div-actividad col-12 col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <h5 class="card-header">
                            ${nombre}
                            <button data-id-actividad="${id}" class="btn-eliminar-actividad btn btn-sm btn-outline-danger float-right text-danger">
                                <i class="fas fa-times"></i>
                            </button>
                        </h5>
                        <div class="card-body">
                            <p class="card-text">${descripcion}</p>
                            <p class="card-subtitle mb-2 text-muted">
                                ${lugar}
                                <span class="float-right">
                                    ${fechaHora}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>`;
    }

    VistaEvento.prototype.eventoEliminarAsistente = function() {
        $('.btn-eliminar-asistente').unbind('click').click((btn) => {
            const $botonEliminar = $(btn.target);
            const idEvento = this.evento.id;
            const idAsistente = $botonEliminar.data('id-asistente');
            $botonEliminar.closest('li').hide();
            this.controladorEvento.eliminarAsistente(idEvento, idAsistente);
        });
    }

    VistaEvento.prototype.eventoEliminarActividad = function() {
        $('.btn-eliminar-actividad').unbind('click').click((btn) => {
            const $botonEliminar = $(btn.target);
            const idEvento = this.evento.id;
            const idActividad = $botonEliminar.data('id-actividad');
            $botonEliminar.closest('.div-actividad').hide();
            this.controladorEvento.eliminarActividad(idEvento, idActividad);
        });
    }

    VistaEvento.prototype.cargarImagenes = function() {
        const imagenes = this.evento.tipo.imagenes;
        const idTipo = this.evento.tipo.id;
        const imagenesHtml = imagenes.map((imagen) => {
            return this.generarImagenHtml(imagen);
        }).join('');
        $('#imgsEvento .carousel-inner').html(imagenesHtml);
        $('#imgPrincipal').attr('src', `img/${idTipo}_1.png`);
    }

    VistaEvento.prototype.generarImagenHtml = function(nombreImg) {
        return `<div class="carousel-item ${nombreImg.match('_1') ? 'active' : ''}">
                    <img class="d-block w-100" src="img/${nombreImg}.png" alt="${this.evento.nombre}" title="${this.evento.nombre}">
                </div>`;
    }

    VistaEvento.prototype.eventoEditarEvento = function() {
        $('#frmEditarEvento').submit((frmEditarEvento) => {
            frmEditarEvento.preventDefault();
            const idEvento = this.evento.id;
            const nombre = $('#nombreEvento').val();
            const organizador = $('#organizadorEvento').val();
            const direccion = $('#direccionEvento').val();
            const cupo = $('#cupoEvento').val();
            const idTipo = $('#tipoEvento').val();
            const tipo = this.controladorEvento.obtenerTipos()[idTipo - 1];
            const asistentes = this.evento.asistentes;
            const actividades = this.evento.actividades;
            const evento = {nombre, organizador, direccion, cupo, tipo, asistentes, actividades};
            this.controladorEvento.modificar(idEvento, evento);
            $('#editarEvento').modal('hide');
            this.obtenerEvento();
        })
    }

    VistaEvento.prototype.eventoAgregarAsistente = function() {
        $('#frmAgregarAsistente').unbind('submit').submit((frmAgregarAsistente) => {
            frmAgregarAsistente.preventDefault();
            const idEvento = this.evento.id;
            const nombre = $('#nombreAsistente').val();
            const correo = $('#correoAsistente').val();
            const asistente = {nombre, correo};
            this.controladorEvento.agregarAsistente(idEvento, asistente);
            $('#agregarAsistente').modal('hide');
            this.mostrarAsistentes();
        })
    }

    VistaEvento.prototype.eventoAgregarActividad = function() {
        $('#frmAgregarActividad').unbind('submit').submit((frmAgregarActividad) => {
            frmAgregarActividad.preventDefault();
            const idEvento = this.evento.id;
            const nombre = $('#nombreActividad').val();
            const descripcion = $('#descripcionActividad').val();
            const lugar = $('#lugarActividad').val();
            const fechaHora = $('#fechaActividad').val() + ' ' + $('#horaActividad').val();
            const actividad = {nombre, descripcion, lugar, fechaHora};
            this.controladorEvento.agregarActividad(idEvento, actividad);
            $('#agregarActividad').modal('hide');
            this.mostrarActividades();
        })
    }

    return VistaEvento;

})(); 

function setSessionStorageEvent(id) {
    sessionStorage.setItem('idEvento', id); 
}

$(function() {
    let vistaEventos = new VistaEvento();
    vistaEventos.obtenerEvento();
});