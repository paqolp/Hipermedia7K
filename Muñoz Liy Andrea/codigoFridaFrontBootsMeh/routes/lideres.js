var express = require('express');
var router = express.Router();
// var apiUrl = 'http://127.0.0.1:5000/api/';
var {sessionCheckerLoginLideres, sessionCheckerLideres} = require('./../session');
var headerFile = '';

function setHeaderFile(req, res, next) {
  if (req.session.user && req.session.user.type == 'lideres') {
      headerFile = 'header';
  } else {
    headerFile = 'headerLogin';
  }
  next();
}

/* GET Mentores listing. */
router.get('/', setHeaderFile, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Código Frida - Líderes',
    section: 'index',
    headerFile: headerFile,
    cssFiles: ['landing-page-liderF/index'],
    jsFiles: []
  }
  res.render('lideres/default-view', options);
});


router.get('/modulos', sessionCheckerLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Lideres - Módulos',
    section: 'modulos',
    headerFile: 'header',
    cssFiles: ['modulo/modulos'],
    jsFiles: ['lideres/modulos']
  }
  res.render('lideres/default-view', options);
});

router.get('/fridas',sessionCheckerLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Fridas',
    section: 'fridas',
    headerFile: 'header',
    cssFiles: [],
    jsFiles: []
  }
  res.render('lideres/default-view', options);
});

router.get('/equipos', sessionCheckerLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Lideres - Equipos',
    section: 'equipos',
    headerFile: 'header',
    cssFiles: ['equipos/equipos'],
    jsFiles: ['lideres/equipos','lideres/fridas','lideres/mainEquiposFridas']
  }
  res.render('lideres/default-view', options);
});

router.get('/mi-perfil', sessionCheckerLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Perfil',
    section: 'mi-perfil',
    headerFile: 'header',
    cssFiles: ['mi-perfil/perfil'],
    jsFiles: ['lideres/mi-perfil']
  }
  res.render('lideres/default-view', options);
});

router.get('/registro', sessionCheckerLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Registro',
    section: 'registro',
    headerFile: 'header',
    cssFiles: ['croppie','login/login'],
    jsFiles: ['croppie.min','lideres/registro']
  }
  res.render('lideres/default-view', options);
});

router.get('/contenido-adicional', sessionCheckerLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Contenido adicional',
    section: 'contenido-adicional',
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: ['lideres/contenido-adicional']
  }
  res.render('lideres/default-view', options);
});

router.get('/inicio-sesion', sessionCheckerLoginLideres, function(req, res) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Login',
    section: 'inicio-sesion',
    headerFile: 'headerLogin',
    cssFiles: ['login/login'],
    jsFiles: ['lideres/login']
  }
  res.render('lideres/default-view', options);
});

router.post('/iniciarSesion',  function(req, res) {
  const { correo } = req.body;
  const targetUrl = global.targetUrl || `${global.baseUrl}/lideres/equipos`;
  req.session.user = {
    id: correo,
    type: 'lideres',
  };
  res.json({targetUrl});
});

router.post('/cerrarSesion', function(req, res) {
  const targetUrl = `${global.baseUrl}/lideres/equipos`;
  req.session.user = null;
  res.json({targetUrl});
});

router.get('/equipos/:equipo/modulos/:id', sessionCheckerLideres, function(req, res) {
  const { equipo, id } = req.params;
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Módulo',
    section: 'equipos',
    subsection: 'modulo',
    idEquipo: equipo,
    idModulo: id,
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: ['bootstrap/bootstrap-filestyle.min']
  }
  res.render('lideres/default-view', options);
});

router.get('/equipos/:equipo', sessionCheckerLideres, function(req, res) {
  const { equipo, id } = req.params;
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Líderes - Equipo N',
    section: 'equipos',
    subsection: 'equipo',
    idEquipo: equipo,
    headerFile: 'header',
    cssFiles: ['equipos/equipos','modulo/modulos'],
    jsFiles: ['lideres/equipo']
  }
  res.render('lideres/default-view', options);
});

router.get('/modulos/:id', sessionCheckerLideres, function(req, res) {
  const { id } = req.params;
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Módulo - Contenido',
    section: 'modulos',
    subsection: 'modulo-contenido',
    idModulo: id,
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: ['lideres/modulo']
  }
  res.render('lideres/default-view', options);
});

module.exports = router;
