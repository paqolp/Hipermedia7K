require('babel-register')({
    presets: [ 'env' ]
});

 __appconfig = require("./appConfig");
global.Promise = require("bluebird").Promise;
const app = require("./application/app").default;
const PORT = process.env.PORT || 3000;

// console.log(app);

app.listen(PORT, () => {
    console.log("Server listening on port 3000");
});