'use strict';

const P = require('bluebird');
const db = require('../db/knex').db;

const getRoles = () => {
	return P.try(() => {
		return db('roles').select(['*']);
	});
};

const getRoleById = (role_id) => {
	return P.try(() => {
		return db('roles').select(['*']).where({
			id: role_id
		});
	});
};

const getRoleByName = (role) => {
	return P.try(() => {
		return db('roles').select(['*']).where({
			role: role
		});
	});
};

module.exports = {
	getRoles: getRoles,
	getRoleById: getRoleById,
	getRoleByName: getRoleByName
};