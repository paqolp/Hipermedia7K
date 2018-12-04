var express = require('express');
var router = express.Router();
var {sessionCheckerLoginFridas, sessionCheckerFridas} = require('./../session');
var headerFile = '';

function setHeaderFile(req, res, next) {
  if (req.session.user && req.session.user.type == 'fridas') {
    headerFile = 'header';
  } else {
    headerFile = 'headerLogin';
  }
  next();
}

/* GET Fridas listing. */
router.get('/', setHeaderFile, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Código Frida - Fridas',
    section: 'index',
    headerFile: headerFile,
    cssFiles: ['landing-page/index'],
    jsFiles: []
  }
  res.render('fridas/default-view', options);
});

router.get('/registro', sessionCheckerLoginFridas, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Registro',
    section: 'registro',
    headerFile: 'headerLogin',
    cssFiles: ['croppie','login/login'],
    jsFiles: ['croppie.min','fridas/registro']
  }
  res.render('fridas/default-view', options);
});

router.get('/inicio-sesion', sessionCheckerLoginFridas, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Inicio de sesión',
    section: 'inicio-sesion',
    headerFile: 'headerLogin',
    cssFiles: ['login/login'],
    jsFiles: ['fridas/login']
  }
  res.render('fridas/default-view', options);
});

router.post('/iniciarSesion', function(req, res, next) {
  const { correo } = req.body;
  const targetUrl = global.targetUrl || `${global.baseUrl}/fridas/modulos`;
  req.session.user = {
    id: correo,
    type: 'fridas',
  };
  res.json({targetUrl});
});

router.post('/cerrarSesion', function(req, res, next) {
  const targetUrl = `${global.baseUrl}/fridas/modulos`;
  req.session.user = null;
  res.json({targetUrl});
});

router.get('/modulos', sessionCheckerFridas, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Módulos',
    section: 'modulos',
    headerFile: 'header',
    cssFiles: ['modulo/modulos'],
    jsFiles: ['fridas/modulos']
  }
  res.render('fridas/default-view', options);
});

router.get('/modulos/:id', sessionCheckerFridas, function(req, res, next) {
  const { id } = req.params;
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Módulo',
    section: 'modulos',
    subsection: 'modulo',
    idModulo: id,
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: ['fridas/modulo'],
  }
  res.render('fridas/default-view', options);
});

router.get('/mi-equipo', sessionCheckerFridas, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Mi equipo',
    section: 'mi-equipo',
    headerFile: 'header',
    cssFiles: ['equipos/equipos'],
    jsFiles: ['fridas/mi-equipo']
  }
  res.render('fridas/default-view', options);
});

router.get('/contenido-adicional', sessionCheckerFridas, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Contenido adicional',
    section: 'contenido-adicional',
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: ['fridas/contenido-adicional']
  }
  res.render('fridas/default-view', options);
});

router.get('/mi-perfil', sessionCheckerFridas, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Fridas - Mi perfil',
    section: 'mi-perfil',
    headerFile: 'header',
    cssFiles: ['mi-perfil/perfil'],
    jsFiles: ['fridas/mi-perfil']
  }
  res.render('fridas/default-view', options);
});

module.exports = router;
