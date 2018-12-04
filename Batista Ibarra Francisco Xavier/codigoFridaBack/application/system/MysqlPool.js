import { createPool } from 'promise-mysql';

const pool = createPool({
    host     : 'localhost',
    user     : 'mysqlRoot',
    password : '123456',
    database : 'codigoFrida',
    connectionLimit: 20
  });

export default pool;
