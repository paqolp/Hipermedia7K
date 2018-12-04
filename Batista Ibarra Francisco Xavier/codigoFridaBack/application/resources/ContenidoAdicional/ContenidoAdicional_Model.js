import pool from '../../system/MysqlPool';

class ContenidoAdicional_Model {
  constructor() {}

  getPaged(page, perPage) {
    return new Promise((resolve, reject) => {
      const limit = perPage;
      const offset = (page - 1) * perPage;
      const queryString = `SELECT ca.id, ca.nombreContenido, ca.descripcion FROM contenidoadicional as ca LIMIT ${limit} OFFSET ${offset}`;
      var contenidos;
      
      pool.query(queryString).then(rows => {
        contenidos = rows;
        const promesas = [];
      
        rows.forEach(row => {
          const queryString = "SELECT mc.id, mc.nombre, mc.archivo FROM contenidoadicional as ca INNER JOIN materiales_contenidoadicional mc on ca.id = mc.idContenidoAdicional WHERE ca.id = ?";
          const promesa = pool.query(queryString, [
            row.id
          ]);
          promesas.push(promesa);
        });
      
        return Promise.all(promesas);
      
      }).then(resultados => {
        resultados.forEach((resultado, index) => {
          contenidos[index].material = resultado
        })
      
        console.log(JSON.stringify(contenidos));
      //   pool.end();
        resolve(contenidos);
      }).catch(err => {
          reject(err);
      });
    })
  }

  addContenido(contenido) {
    return new Promise((resolve, reject) => {
      const queryString = `insert into contenidoadicional (descripcion, nombreContenido) VALUES
      (?, ?)`;
      pool.query(queryString, [
        contenido.descripcion,
        contenido.nombre
      ]).then(meta => resolve(meta)).catch(err => reject(err));
    })
  }

  addMaterial(material) {
    return new Promise((resolve, reject) => {
      const queryString = `INSERT INTO materiales_contenidoadicional (idContenidoAdicional, nombre, archivo) VALUES 
      (?, ?, ?)`;
      pool.query(queryString, [
        material.idContenidoAdicional,
        material.nombre,
        material.archivo
      ]).then(meta => resolve(meta)).catch(err => reject(err));
    })
  }
}

export default ContenidoAdicional_Model;