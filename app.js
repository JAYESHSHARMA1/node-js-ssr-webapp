
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const cors = require('cors');

 
const app = express();
const whitelist = ['http://localhost:3000', 'https://app-ysh.vercel.app'];
const corsOptions= {
  origin:whitelist
}

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
  }));
app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// app.use(express.static(path.join(__dirname, 'dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404', {  messages: { error: '' } })
});

// error handler
app.use(function(err, req, res, next) {
  res.render('500', {  messages: { error: process.env.NODE_ENV === 'production' ? '': err } })
});

module.exports = app;
