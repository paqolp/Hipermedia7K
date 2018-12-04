const config = __appconfig.swagger;

export const definition = {
    info: {
        title: "Código Frida",
        version: "Dev",
    },
    host: config.host + ":" + config.port,
    basePath: config.basePath,
};
export const apis = [
    "./application/system/HttpResponse.js",
    "./application/resources/**/*.js"
];
