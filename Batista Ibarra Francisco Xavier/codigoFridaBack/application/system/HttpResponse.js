/**
 * @swagger
 * responses:
 *   badRequest:
 *     description: Error en la validación de datos
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         errorType:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5, 6]
 *         trace:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               stepName:
 *                 type: string
 *   unauthorized:
 *     description: Datos de sesión incorrectos
 *     type: object
 *     properties:
 *       message:
 *         type: string
 * 
 *   notFound:
 *     description: Recurso no encontrado
 *     type: object
 *     properties:
 *       message:
 *         type: string
 * 
 *   internalServerError:
 *     description: Error interno en el servidor
 *     type: object
 *     properties:
 *       message:
 *         type: string
 * 
 *   methodNotAllowed:
 *     description: Método no permitido para la ruta
 *     type: object
 *     properties:
 *       message:
 *         type: string
 * 
 *   unsupportedMediaType:
 *     description: El contenido enviado no está en json o urlencoded
 *     type: object
 *     properties:
 *       message:
 *         type: string
 * 
 *   default:
 *     description: Error inesperado
 *     type: object
 *     properties:
 *       message:
 *         type: string
 * 
 * definitions:
 *   Paginado:
 *     type: object,
 *     properties:
 *       page:
 *         type: number
 *         minimum: 1
 *         description: El número de página, comenzando en 1
 *       perPage:
 *         type: number
 *         minimum: 1
 *         description: Los elementos de página
 * 
 */

const responses = {
    200: "OK",
    201: "Created",
    204: "No Content",
    304: "Not Modified",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    409: "Conflict",
    410: "Gone",
    415: "Unsupported Media Type",
    429: "Too Many Requests",
    500: "Internal Server Error"
}

// Declaración de la clase
export default class HttpResponse {
    constructor(res) {
        for (let code in responses) {
            // Para que no se sustituya el código alv
            const staticCode = code;
            // Hacemos que el nombre del método a invocar sea camelCase 
            let methodName = "";
            const methodWords = responses[staticCode].split(" ");
            for (let index in methodWords) {
                // Hacemos toda la palabra minúscula
                methodWords[index] = methodWords[index].toLowerCase();
                // Si no es la primera palabra, hacemos la primera letra mayúscula
                if (index > 0) {
                    methodWords[index] = methodWords[index][0].toUpperCase() + methodWords[index].substr(1);
                }
                methodName += methodWords[index];
            }
            // Creamos el método de respuesta con el nombre generado en camelCase
            HttpResponse.prototype[methodName] = (data) => {
                res.status(staticCode).json(data);
            };
        }
    }
    ErrorGenerico() {
        const malioSal = Math.floor(Math.random() * (10));
        if (malioSal == 0) {
            this.internalServerError({ message: "Algo malió sal :C" });
        }
        else {
            this.internalServerError({ message: "Algo salió mal :C" });
        }
    }
}