if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

/* routes */
var indexRouter = require('./routes/index');
var emailRouter = require('./routes/email');
var donateRouter = require('./routes/donate');
var contactRouter = require('./routes/contact');
var volunteerRouter = require('./routes/volunteer');
var newsRouter = require('./routes/news');
var eventsRouter = require('./routes/events');
var bioRouter = require('./routes/bio');

/* handlebars */
const exphbs  = require('express-handlebars');

var app = express();
app.enable('trust proxy');

// view engine setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: require('./config/handlebars-helpers'),
  defaultLayout: 'layout', 
  layoutsDir:path.join(__dirname, 'views'),
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/donate', donateRouter);
app.use('/contact', contactRouter);
app.use('/email', emailRouter);
app.use('/volunteer', volunteerRouter);
app.use('/news', newsRouter);
//app.use('/events', eventsRouter);
//app.use('/bio', bioRouter);

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
