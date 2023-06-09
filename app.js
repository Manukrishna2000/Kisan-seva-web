var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var session = require('express-session')
var fileUpload = require('express-fileupload')

var app = express();

app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true,

  
}))

var adminRouter=require('./routes/admin');
var farmerRouter=require('./routes/farmer');
var workerRouter=require('./routes/worker');
var usersRouter = require('./routes/users');
var homeRouter=require('./routes/home');
var hbs = require('express-handlebars');
const nocache = require('nocache');
const { handlebars } = require('hbs');


handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

const oneDay = 1000 * 60 * 60 * 24;



app.use('/',homeRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/farmer',farmerRouter);
app.use('/worker', workerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
