import { database as config } from "../../appConfig";
import useragent from "express-useragent";
import { createPool } from "mysql";

const mysqlPool = createPool(config);
const LogCatcher = (req, res, next) => {
    if (req.headers["Authorization"])
        mysqlPool.query("INSERT INTO bitacora VALUES (NULL, '0', ?, ?, ?, ?, DEFAULT)", [
            req.method,
            req.url,
            req.connection.remoteAddress,
            req.headers['user-agent']
        ]);
    next();
};

export default LogCatcher;