const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const {error} = require("./utils/response");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(error(res, [], 'No routes found on this path.'));
});

module.exports = app;

