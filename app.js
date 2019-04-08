var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var mainRouter = require('./routes/main');
var userRouter = require('./routes/user');
var apiRouter = require('./routes/api');
var session = require('express-session');
var app = express();


//basic favicon
app.use(favicon(path.join(__dirname, 'public','assets','images','favicon.ico')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router 보다 앞에 있어야 함
app.use(session({
  secret : "mysite-session",
  resave : true,
  saveUninitialized : true
}));

app.all('*',function(req,res,next){
  res.locals.req = req;
  res.locals.res = res;
  next();
});

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

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
