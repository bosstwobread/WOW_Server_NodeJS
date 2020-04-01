var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fs = require("fs");
var app = express();
fs.readFile('config.json', 'utf8', function (err, data) {
  if (err) console.log(err);
  global.config = JSON.parse(data);
  global.viewDir = path.join(__dirname, 'views');
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var testRouter = require('./routes/test');
  var testRegister = require('./routes/register');

  // testRegister.all('*', function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type');
  //   next();
  // });

  // view engine setup
  app.set('views', global.viewDir);
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/test', testRouter);
  app.use('/register', testRegister);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
})

module.exports = app;