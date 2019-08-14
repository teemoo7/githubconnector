'use strict';

const express = require('express');
const app = express();
const notifs = require('./notifs');

notifs.setup(app);

app.listen(3000, () => console.log('Server ready'));

module.exports = app;
