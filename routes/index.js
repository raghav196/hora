'use strict';

const router = require('express-promise-router')();

require('./user')(router);
require('./task')(router);


module.exports = router;