var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require("express-fileupload");

// Required routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var bagsRouter = require('./routes/bags');
var bookingRouter = require('./routes/bookings');
var categoryRouter = require('./routes/categories');
var productRouter = require('./routes/products');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Paths
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/bags', bagsRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);

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
