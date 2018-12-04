import HttpResponse from '../../system/HttpResponse'
import ContenidoAdicional_Model from './ContenidoAdicional_Model'
import fs from 'fs';

class ContenidoAdicional_Controller {
    constructor() {}

    getPaged(req, res) {
        const Response = new HttpResponse(res);
        const ContenidoAdicional = new ContenidoAdicional_Model();
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 10;

        ContenidoAdicional.getPaged(page, perPage).then(modulos => {
            Response.ok(modulos);
        }).catch(err => {
            Response.internalServerError(err);
        })
    }

    addContenido(req, res) {
        const Response = new HttpResponse(res);
        const ContenidoAdicional = new ContenidoAdicional_Model();

        ContenidoAdicional.addContenido(req.body).then(meta => {
            Response.ok(meta);
        }).catch(err => {
            Response.internalServerError(err);
        })
    }

    uploadMaterial(req, res) {
        const Response = new HttpResponse(res);
        const ContenidoAdicional = new ContenidoAdicional_Model();

        const nombreArchivo = `CA${req.params.idContenidoAdicional}_${req.body.nombre}`;
        fs.writeFile(`application/public/materialesAdicionales/${nombreArchivo}`, req.body.archivo, 'base64', (err) => {if (err) {console.error(err); throw err}});

        delete req.body.archivo;
        const material = req.body;
        material.archivo = nombreArchivo;
        material.idContenidoAdicional = req.params.idContenidoAdicional
        console.log(material);

        ContenidoAdicional.addMaterial(material).then(meta => {
            Response.ok(meta);
        }).catch(err => {
            console.error(err);
            Response.ErrorGenerico();
        })
    }
}

export default ContenidoAdicional_Controller