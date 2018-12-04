import pool from '../../system/MysqlPool';
import randomStringGenerator from 'randomstring';

class Equipos_Model {
  constructor() {}

  getPaged(page, perPage) {
    return new Promise((resolve, reject) => {
      const queryString = `SELECT id, nombre, codigo codigo FROM equipos`;

      var equipos;
      
      pool.query(queryString).then(rows => {
          equipos = rows;
        const promesas = [];
        const promesas2 = [];
        const promesas3 = [];
      
        rows.forEach(row => {
          //Promesa Query para Obtener Fridas
          var queryString = "SELECT ue.id, ue.idRol, ue.nombre, ue2.idEquipo FROM usuarios as ue INNER JOIN usuarios_equipos as ue2 on ue.id = ue2.idUsuario WHERE ue.idRol=1 && ue2.idEquipo=?";
          const promesa1 = pool.query(queryString, [
              row.id
          ]);
          promesas.push(promesa1);
          
          //Promesa Query para Obtener Mentores
          queryString = "SELECT ue.id, ue.idRol, ue.nombre, ue2.idEquipo FROM usuarios as ue INNER JOIN usuarios_equipos as ue2 on ue.id = ue2.idUsuario WHERE ue.idRol=2 && ue2.idEquipo=?";
          const promesa2 = pool.query(queryString, [
                row.id
            ]);
          promesas2.push(promesa2);
          
          //Promesa Query para Obtener Mentores
          queryString = 
          `SELECT CAST(sum(progreso) / count(*) as unsigned ) as progreso from (
            SELECT id, numero, nombre as nombreModulo, fechaLimite, descripcion, cast((coalesce(progreso.subidos / progreso.todos, 0) * 100) as SIGNED) as progreso FROM modulos LEFT JOIN (
                SELECT idModulo, count(*) as todos, count(archivoSubido) as subidos from modulos inner join modulo_contenidos mc on modulos.id = mc.idModulo left join ejercicios e on mc.id = e.idContenidoModulo and e.idEquipo = ? group by idModulo
              ) AS progreso on progreso.idModulo = id
            ) as t`;
          const promesa3 = pool.query(queryString, [
                row.id
            ]);
          promesas3.push(promesa3);
        });
      
          var res = Promise.all(promesas);
          var res2 = Promise.all(promesas2);
          var res3 = Promise.all(promesas3);
          return Promise.all([res, res2, res3]);
      
      }).then(resultados => {
        resultados[0].forEach((resultado, index) => {
          equipos[index].integrantes = resultado
        })
        resultados[1].forEach((resultado, index) => {
          equipos[index].mentores = resultado
        })
        resultados[2].forEach((resultado, index) => {
          equipos[index].progreso = resultado[0].progreso
        })
      
        console.log(JSON.stringify(equipos));
        resolve(equipos);
      }).catch(err => {
          reject(err);
      });
    })
  }

  getById(idEquipo) {
    return new Promise((resolve, reject) => {
      const queryString = "SELECT id, nombre, codigo FROM equipos WHERE id = ?";
      var equipos;

      pool.query(queryString, [idEquipo]).then(rows => {
          equipos = rows;
        const promesas = [];
        const promesas2 = [];
        const promesas3 = [];

        rows.forEach(row => {
          //Promesa Query para Obtener Fridas
          var queryString = "SELECT u.id, u.nombre, u.apPaterno, u.apMaterno, u.apPaterno, u.fotografia, u.correo, u.fechaNacimiento, u.fotografia FROM usuarios AS u INNER JOIN usuarios_equipos ue on u.id = ue.idUsuario WHERE u.idRol = 1 && ue.idEquipo = ?";
          const promesa1 = pool.query(queryString, [
            row.id
          ]);
          promesas.push(promesa1);
          
          //Promesa Query para Obtener Mentores
          queryString = "SELECT u.id, u.nombre, u.apPaterno, u.apMaterno, u.apPaterno, u.fotografia, u.correo FROM usuarios AS u INNER JOIN usuarios_equipos ue on u.id = ue.idUsuario WHERE u.idRol = 2 && ue.idEquipo = ?";
          const promesa2 = pool.query(queryString, [
              row.id
            ]);
          promesas2.push(promesa2);

          //Promesa Query para Obtener Insignias
          queryString = "SELECT insignia2.id, insignia.id AS idInsignia, m.numero as numeroModulo, insignia.nombre, insignia.descripcion FROM insignia INNER JOIN equipos_insignia insignia2 on insignia.id = insignia2.idInsignia inner join modulos m on insignia.idModulo = m.id WHERE insignia2.idEquipo = ?";
          const promesa3 = pool.query(queryString, [
              row.id
            ]);
          promesas3.push(promesa3);
        });

          var res = Promise.all(promesas);
          var res2 = Promise.all(promesas2);
          var res3 = Promise.all(promesas3);
          return Promise.all([res, res2, res3]);

      }).then(resultados => {
          equipos[0].integrantes = resultados[0];
          equipos[0].mentores = resultados[1];
          equipos[0].insignias = resultados[2];

        console.log(JSON.stringify(equipos[0]));
        resolve(equipos[0]);
      }).catch(err => {
          reject(err);
      });
    })
  }

  getEquipoByClave(codigo) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM equipos WHERE codigo = ?', [
        codigo
      ]).then(result => {
        resolve(result[0])
      }).catch(err => {
        reject(err);
      })
    })
  }

  addEquipo(nombre) {
    const codigo = randomStringGenerator.generate(6);
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO equipos (nombre, codigo) VALUES (?, ?)', [
        nombre,
        codigo
      ]).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err);
      })
    })
  }
  
  addUsuarioToEquipo(idUsuario, idEquipo) {
    const queryString = 'INSERT INTO usuarios_equipos (idUsuario, idEquipo) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      pool.query(queryString, [
        idUsuario,
        idEquipo
      ]).then(meta => {
        resolve(meta);
      }).catch(err => reject(err))
    })
  }

  deleteUsuarioFromEquipo(idEquipo, idUsuario) {
    const queryString = 'DELETE FROM usuarios_equipos WHERE idUsuario = ? AND idEquipo = ?';
    return new Promise((resolve, reject) => {
      pool.query(queryString, [
        idUsuario,
        idEquipo
      ]).then(meta => {
        resolve(meta);
      }).catch(err => reject(err))
    })
  }
}

export default Equipos_Model;