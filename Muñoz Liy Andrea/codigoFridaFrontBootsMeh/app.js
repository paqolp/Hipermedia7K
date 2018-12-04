global.baseUrl = 'http://127.0.0.1:3000';
global.apiUrl = 'http://ventascatalogo.xyz:5000/api/';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var fridasRouter = require('./routes/fridas');
var lideresRouter = require('./routes/lideres');
var mentoresRouter = require('./routes/mentores');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'user_sid',
  secret: 'c0d1g0Fr1d4Fr0nt',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 60000*60,
    secure: false
  }
}));

// Check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');
  }
  next();
});

app.use('/', indexRouter);
app.use('/fridas', fridasRouter);
app.use('/lideres', lideresRouter);
app.use('/mentores', mentoresRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  if(err.status) {
    res.render(err.status.toString());
  } else {
    next();
  }
});

module.exports = app;
