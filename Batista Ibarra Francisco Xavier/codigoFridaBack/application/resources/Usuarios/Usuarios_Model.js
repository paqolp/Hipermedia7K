import pool from '../../system/MysqlPool';
import saltGenerator from 'randomstring';
import encrypt from 'js-sha256'

class Usuarios_Model {
    constructor() {}

    getPaged(page, perPage) {
        return new Promise((resolve, reject) => {
            const limit = perPage;
            const offset = (page - 1) * perPage;
            const queryString = "SELECT * FROM usuarios LIMIT ? OFFSET ?";

            pool.query(queryString, [
                limit,
                offset
            ]).then(rows => {
                resolve(rows);
            }).catch(err => {
                reject(err);
            });
        })
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT * FROM usuarios WHERE id = ?";

            pool.query(queryString, [
                id
            ]).then(rows => {
                resolve(rows[0]);
            }).catch(err => {
                reject(err);
            });
        })
    }

    getSinEquipoByRol(idRol) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT u.* FROM usuarios as u LEFT JOIN usuarios_equipos ue on u.id = ue.idUsuario WHERE ue.idEquipo IS NULL AND u.idRol = ?"

            pool.query(queryString, [
                idRol
            ]).then(rows => {
                resolve(rows);
            }).catch(err => {
                reject(err);
            });
        })
    }

    getMiPerfilById(id) {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT id, nombre, apPaterno, apMaterno, fechaNacimiento, telefono, correo FROM usuarios WHERE id = ?";
    
            pool.query(queryString, [
                id
            ]).then(rows => {
                resolve(rows);
            }).catch(err => {
                reject(err);
            });

        })
    }

    addUser(usuario) {
        const sal = saltGenerator.generate(32);
        const hash = encrypt.sha256(sal + usuario.contrasena);

        return new Promise((resolve, reject) => {
            const queryString = 'INSERT INTO usuarios (nombre, apPaterno, apMaterno, fechaNacimiento, telefono, correo, escuela, disciplina, contrasena, sal, fotografia, idRol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            pool.query(queryString, [
                usuario.nombre,
                usuario.apPaterno,
                usuario.apMaterno,
                usuario.fechaNacimiento,
                usuario.telefono,
                usuario.correo,
                usuario.escuela || null,
                usuario.disciplina || null,
                hash,
                sal,
                usuario.fotografia, 
                usuario.idRol
            ]).then(meta => {
                resolve(meta)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default Usuarios_Model;