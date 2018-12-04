import pool from '../../system/MysqlPool';
import UUID from 'uuid/v4';

class Sesiones_Model {
    constructor() {}

    logIn(usuarioId) {
        return new Promise((resolve, reject) => {
            const token = UUID();
            const queryString = "INSERT INTO sesiones VALUES (?, ?)";
            pool.query(queryString, [token, usuarioId]).then(() => {
                resolve(token);
            });
        })
    }

    getAuthData(correo) {
        const queryString = "SELECT id, contrasena, sal FROM usuarios WHERE correo = ?";
        return pool.query(queryString, [correo]);
    }

    checkSession(token) {
        const queryString = "SELECT u.*, ANY_VALUE(ue.idEquipo) AS equipo FROM sesiones AS s INNER JOIN usuarios AS u ON s.usuarioId = u.id LEFT JOIN usuarios_equipos ue on u.id = ue.idUsuario where s.token = ? GROUP BY id";
        return pool.query(queryString, [token]);
    }
}

export default Sesiones_Model;