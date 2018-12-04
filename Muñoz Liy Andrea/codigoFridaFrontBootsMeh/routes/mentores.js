var express = require('express');
var router = express.Router();
var {sessionCheckerLoginMentores, sessionCheckerMentores} = require('./../session');
var headerFile = '';

function setHeaderFile(req, res, next) {
  if (req.session.user && req.session.user.type == 'mentores') {
      headerFile = 'header';
  } else {
    headerFile = 'headerLogin';
  }
  next();
}

/* GET Mentores listing. */
router.get('/', setHeaderFile, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Código Frida - Mentores',
    section: 'index',
    headerFile: headerFile,
    cssFiles: [],
    jsFiles: []
  }
  res.render('mentores/default-view', options);
});

router.get('/registro', sessionCheckerLoginMentores, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Registro',
    section: 'registro',
    headerFile: 'headerLogin',
    cssFiles: ['login/login'],
    jsFiles: ['bootstrap/bootstrap-filestyle.min','mentores/registro']
  }
  res.render('mentores/default-view', options);
});

router.get('/inicio-sesion', sessionCheckerLoginMentores, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Inicio de sesión',
    section: 'inicio-sesion',
    headerFile: 'headerLogin',
    cssFiles: ['login/login'],
    jsFiles: ['mentores/login']
  }
  res.render('mentores/default-view', options);
});

router.post('/iniciarSesion', function(req, res, next) {
  const { correo } = req.body;
  const targetUrl = global.targetUrl || `${global.baseUrl}/mentores/mis-equipos`;
  req.session.user = {
    id: correo,
    type: 'mentores',
  };
  res.json({targetUrl});
});

router.post('/cerrarSesion', function(req, res, next) {
  const targetUrl = `${global.baseUrl}/mentores/mis-equipos`;
  req.session.user = null;
  res.json({targetUrl});
});

router.get('/mis-equipos', sessionCheckerMentores, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Mis equipos',
    section: 'mis-equipos',
    headerFile: 'header',
    cssFiles: [],
    jsFiles: []
  }
  res.render('mentores/default-view', options);
});

router.get('/mis-equipos/:equipo', sessionCheckerMentores, function(req, res, next) {
  const { equipo } = req.params;
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Mis equipos',
    section: 'mis-equipos',
    subsection: 'equipo',
    idEquipo: equipo,
    headerFile: 'header',
    cssFiles: [],
    jsFiles: []
  }
  res.render('mentores/default-view', options);
});

router.get('/mis-equipos/:equipo/modulos/:id', sessionCheckerMentores, function(req, res, next) {
  const { equipo, id } = req.params;
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Módulo',
    section: 'mis-equipos',
    subsection: 'modulo',
    idEquipo: equipo,
    idModulo: id,
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: ['bootstrap/bootstrap-filestyle.min']
  }
  res.render('mentores/default-view', options);
});

router.get('/contenido-adicional', sessionCheckerMentores, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Contenido adicional',
    section: 'contenido-adicional',
    headerFile: 'header',
    cssFiles: ['modulo/modulo'],
    jsFiles: []
  }
  res.render('mentores/default-view', options);
});

router.get('/mi-perfil', sessionCheckerMentores, function(req, res, next) {
  const options = {
    apiUrl: global.apiUrl,
    baseUrl: global.baseUrl,
    title: 'Mentores - Mi perfil',
    section: 'mi-perfil',
    headerFile: 'header',
    cssFiles: ['mi-perfil/perfil'],
    jsFiles: []
  }
  res.render('mentores/default-view', options);
});

module.exports = router;
