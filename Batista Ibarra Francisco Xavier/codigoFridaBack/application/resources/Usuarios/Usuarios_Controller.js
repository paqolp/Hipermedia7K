import HttpResponse from '../../system/HttpResponse'
import Usuarios_Model from './Usuarios_Model'
import Equipos_Model from '../Equipos/Equipos_Model';
import UUID from 'uuid/v4'
import fs from 'fs'

class Usuarios_Controller {
    constructor() {}

    getPaged(req, res) {
        const Response = new HttpResponse(res);
        const Usuarios = new Usuarios_Model();
        const {rol, equipo} = req.query;
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 10;

        if (rol != undefined && equipo != undefined && equipo == 0) {
            Usuarios.getSinEquipoByRol(rol).then(usuarios => {
                Response.ok(usuarios);
            }).catch(err => {
                Response.badRequest(err);
            })
        } else if (req.query.miPerfil) {
            Usuarios.getMiPerfilById(req.idUsuario).then(usuario => {
                Response.ok(usuario[0]);
            }).catch(err => {
                Response.notFound(err);
            })
        } else {
            Usuarios.getPaged(page,perPage).then(usuarios => {
                Response.ok(usuarios);
            }).catch(err => {
                Response.badRequest(err);
            })
        }

    }

    getById(req, res) {
        const Response = new HttpResponse(res);
        const Usuarios = new Usuarios_Model();
        const idUsuario = req.params.id

        Usuarios.getById(idUsuario).then(modulo => {
            Response.ok(modulo);
        }).catch(err => {
            Response.notFound(err);
        })
    }

    addUser(req, res) {
        const Response = new HttpResponse(res);
        const Equipos = new Equipos_Model();
        const Usuarios = new Usuarios_Model();
        let fotografiaBase64 = null;
        let nombreFotografia = null;
        let idEquipo;
        let idUsuario;

        if (req.body.equipo) {
            new Promise((resolve, reject) => {
                // Primero revisamos si el equipo es un nombre o una clave
                if (req.body.equipo.nombre) {// Es un nombre, hay que crear el equipo
                    Equipos.addEquipo(req.body.equipo.nombre).then(meta => resolve(meta.insertId))
                } else { // Es una clave, hay que obtener el id del equipo
                    Equipos.getEquipoByClave(req.body.equipo.clave).then(equipo => resolve(equipo.id))
                }
            }).then(equipo => {
                idEquipo = equipo;
                delete req.body.equipo;
    
                // Guardamos la imagen en una variable
                if (req.body.fotografia) {
                    fotografiaBase64 = req.body.fotografia;
                    nombreFotografia = UUID();
                    req.body.fotografia = nombreFotografia;
                } else {
                    req.body.fotografia = 0
                }
    
                return Usuarios.addUser(req.body);
            }).then(usuario => {
                if (fotografiaBase64) {
                    fs.writeFileSync(`application/public/img/${nombreFotografia}.jpg`, fotografiaBase64, 'base64');
                }
                idUsuario = usuario.insertId;
                return Equipos.addUsuarioToEquipo(usuario.insertId, idEquipo)
            }).then(meta => {
                return Usuarios.getById(idUsuario)
            }).then(usuario => {
                Response.created(usuario);
            }).catch(err => {
                console.error(err);
                Response.ErrorGenerico();   
            })
        } else {
            // Guardamos la imagen en una variable
            if (req.body.fotografia) {
                fotografiaBase64 = req.body.fotografia;
                nombreFotografia = UUID();
                req.body.fotografia = nombreFotografia;
            } else {
                req.body.fotografia = 0
            }

            Usuarios.addUser(req.body).then(usuario => {
                if (fotografiaBase64) {
                    fs.writeFileSync(`application/public/img/${nombreFotografia}.jpg`, fotografiaBase64, 'base64');
                }
                return Usuarios.getById(usuario.insertId)
            }).then(usuario => {
                Response.created(usuario);
            }).catch(err => {
                console.error(err);
                Response.ErrorGenerico();   
            })
        }
    }
}

export default Usuarios_Controller