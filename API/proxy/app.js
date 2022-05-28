const express = require('express');
const logger = require('morgan');
const {error} = require("./utils/response");
const app = express();
const proxy = require('express-http-proxy');
var cors = require('cors')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(express.static('public'))

app.use('/api/users', proxy('http://localhost:3001'));
app.use('/api/export', proxy('http://localhost:3002'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(error(res, [], 'No routes found on this path.'));
});

module.exports = app;

