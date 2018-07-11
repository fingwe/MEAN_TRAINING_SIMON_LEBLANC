const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRouter = require('./api/routes/apiRouter');
const bodyParser = require('body-parser');
const sessions = require('express-session');
//const rs = require('connect-redis')(sessions);
const openid = require('openid-connect');

const app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/static", express.static("static"));

//app.use(sessions({
 // store: new rs({host: '1270.0.1', port: 6379}),
 // cookie: {httpOnly: true},
 // secret: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gUGhhc2VsbHVzIGF0IGxhb3JlZXQgc2VtLiBOdWxsYSBjb25zZWN0ZXR1ciBzZW1wZXIgbGFjdXMsIG5lYyBhbGlxdWFtIGVyYXQgcGVsbGVudGVzcXVlIGV0LiBWZXN0aWJ1bHVtIGV0IGF1Z3VlIHNvbGxpY2l0dWRpbiBsZW8gZWxlaWZlbmQgYmliZW5kdW0gZWdldCBpbiBlc3QuIFNlZCBhYyBxdWFtIGJsYW5kaXQsIG1vbGVzdGllIHZvbHV0cGF0Lg=='
//}));

/**
 * MiddleWare that enable cross origin requests
 */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Router declaration
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
  res.send(err.stack);
});

module.exports = app;
