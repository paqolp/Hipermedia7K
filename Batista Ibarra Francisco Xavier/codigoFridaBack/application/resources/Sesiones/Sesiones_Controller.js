import HttpResponse from '../../system/HttpResponse'
import Sesiones_Model from './Sesiones_Model'
import SHA256 from 'js-sha256';

class Sesiones_Controller {
    constructor() {}

    logIn(req, res) {
        const response = new HttpResponse(res);
        const Sesiones = new Sesiones_Model();
        Sesiones.getAuthData(req.body.correo).then(pass => {
            console.log(pass);
            if (!pass.length) {
                throw {message: "Usuario y/o contrasena incorrecto(s)"};
            }
            pass = pass[0];
            const saltedPass = pass.sal + req.body.contrasena;
            const encryptedPass = SHA256(saltedPass);
            console.log(pass.contrasena);
            console.log(encryptedPass);
            if (pass.contrasena !== encryptedPass) {
                throw {message: "Usuario y/o contrasena incorrecto(s)"};
            }
            return Sesiones.logIn(pass.id);
        }).then(token => {
            Sesiones.checkSession(token).then(usuario => {
                usuario[0].token = token;
                delete usuario[0].contrasena;
                delete usuario[0].sal;
                response.created(usuario[0]);
            })
        }).catch(err => {
            response.unauthorized(err)
        })
    }


    checkSesion(req, res, next) {
        const response = new HttpResponse(res);
        const Sesion = new Sesiones_Model();

        Sesion.checkSession(req.headers["authorization"]).then(verificacion => {
            if (verificacion.length) {
                req.token = req.headers["authorization"];
                req.idUsuario = verificacion[0].id;
                req.idEquipo = verificacion[0].equipo;
                delete req.headers["authorization"];
                next();
            } else {
                response.unauthorized({message: "La sesión no está iniciada"});
            }
        }).catch(err => {
            if (err.status == "exception") {
                response.unauthorized({message: "La sesión no está iniciada"});
            } else {
                console.error(err.message);
                response.ErrorGenerico();
            }
        });
    }
}

export default Sesiones_Controller