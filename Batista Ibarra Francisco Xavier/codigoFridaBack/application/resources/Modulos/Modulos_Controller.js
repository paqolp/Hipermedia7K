import HttpResponse from '../../system/HttpResponse'
import Modulos_Model from './Modulos_Model'
import fs from 'fs'
import Mailer from '../../system/Mailer';

class Modulos_Controller {
    constructor() {}

    getPaged(req, res) {
        const Response = new HttpResponse(res);
        const Modulos = new Modulos_Model();

        const idEquipo = req.idEquipo || req.query.idEquipo;

        Modulos.getPaged(idEquipo).then(modulos => {
            Response.ok(modulos);
        }).catch(err => {
            Response.internalServerError(err);
        })
    }

    getById(req, res) {
        const Response = new HttpResponse(res);
        const Modulos = new Modulos_Model();
        const idModulo = req.params.id

        Modulos.getById(idModulo, req.idEquipo).then(modulo => {
            Response.ok(modulo);
        }).catch(err => {
            Response.notFound(err);
        })
    }

    addContenido(req, res) {
        const Response = new HttpResponse(res);
        const Modulos = new Modulos_Model();

        Modulos.getNextContenidoByModulo(req.params.id).then(numeroSiguiente => {
            req.body.numero = numeroSiguiente;
            req.body.idModulo = req.params.id;
            return Modulos.addContenido(req.body);
        }).then(meta => {
            return Modulos.getContenidoById(meta.insertId)
        }).then(contenido => {
            Response.created(contenido);
        }).catch(err => {
            console.error(err);
            Response.ErrorGenerico();
        })
    }

    uploadEjercicio(req, res) {
        const Response = new HttpResponse(res);
        const Modulos = new Modulos_Model();

        const nombreArchivo = `E${req.body.idEquipo}U${req.body.idUsuario}M${req.params.idModulo}C${req.params.idContenido}_${req.body.nombreArchivo}`;
        fs.writeFile(`application/public/ejercicios/${nombreArchivo}`, req.body.archivo, 'base64', (err) => {if (err) {console.error(err); throw err}});

        delete req.body.archivo;
        const ejercicio = req.body;
        ejercicio.archivoSubido = nombreArchivo;
        ejercicio.idContenido = req.params.idContenido

        Modulos.addEjercicio(ejercicio).then(meta => {
            return Modulos.asignarInsignia(req.idEquipo, req.params.idModulo)
        }).then(meta => {
            if (meta) {
                Mailer('', 'La wea jala', 'la wea efectivamente jalaaaaaaaaa')
            }
            Response.ok(meta);
        }).catch(err => {
            console.error(err);
            Response.ErrorGenerico();
        })
    }

    uploadMaterial(req, res) {
        const Response = new HttpResponse(res);
        const Modulos = new Modulos_Model();

        const nombreArchivo = `M${req.params.idModulo}C${req.params.idContenido}_${req.body.nombre}`;
        fs.writeFile(`application/public/materiales/${nombreArchivo}`, req.body.archivo, 'base64', (err) => {if (err) {console.error(err); throw err}});

        delete req.body.archivo;
        const material = req.body;
        material.archivo = nombreArchivo;
        material.idContenido = req.params.idContenido

        Modulos.addMaterial(material).then(meta => {
            Response.ok(meta);
        }).catch(err => {
            console.error(err);
            Response.ErrorGenerico();
        })
    }

    addComentario(req, res) {
        const Response = new HttpResponse(res);
        const Modulos = new Modulos_Model();

        req.body.idContenido = req.params.idContenido;
        Modulos.addComentario(req.body).then(meta => {
            Response.created(meta);
        }).catch(err => {
            console.error(err);
            Response.ErrorGenerico();
        })
    }
}

export default Modulos_Controller