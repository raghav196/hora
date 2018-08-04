'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;

const getService = (service) => {
	return db('services').select(['*']).where({
		service: service
	});
};

module.exports = {
	getService: getService
};