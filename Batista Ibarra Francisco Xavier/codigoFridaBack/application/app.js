import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import logCatcher from "./system/LogCatcher";

// import swaggerConfig from "./system/SwaggerConfig";
// import swaggerJSDoc from "swagger-jsdoc";
// import { serve, setup } from "swagger-ui-express";
import routes from "./resources/routes";

const app = express();
app.use(cors());

// Inicializamos body-parser
app.use(json({limit: '50mb', extended: true}));
app.use(urlencoded({limit: '50mb', extended: true}));

// Inicializamos swaggerSpec
// global.swaggerSpec = swaggerJSDoc(swaggerConfig);

// if (process.env["PROD"] != 1) { // Sólo en desarrollo
//     app.get("/docs", serve, setup(global.swaggerSpec));
//     app.get("/swaggerSpec", (req, res) => {
//         res.json(swaggerSpec);
//     });
// }

// Archivos públicos
app.use('/public', express.static('application/public'));

// Registramos los routers
app.use("/api", routes); // Middleware para el log de las rutas

// Manejamos el 404
app.use((req, res) => {
    const HttpResponse = new (require("./system/HttpResponse").default)(res);
    HttpResponse.notFound({
        message: `El recurso ${req.method} ${req.url} no se encuentra`
    });
});

export default app;
