const express = require('express');
const app = express();

app.use('/user', require('./usuario'));
module.exports = app;