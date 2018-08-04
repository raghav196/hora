'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;

const registerUser = (userObj) => {
	return P.try(() => {
		return db('users').insert(userObj, ['*']);
	});
};


const findUser = (userId, userEmail, userRole) => {
	return P.try(() => {

		let query = db('users').innerJoin('roles', function(){
			this.on('users.role_id', '=', 'roles.id');
		});

		if(userId){
			query.where('users.id', '=', userId);
		}

		if(userEmail){
			query.where('users.email', '=', userEmail);
		}

		if(userRole){
			query.where('users.role_id', '=', userRole);
		}

		return query.select([
			'users.id as id',
			'users.name',
			'users.email',
			'users.country_code',
			'users.phone',
			'users.password',
			'users.role_id',
			'roles.role',
			'users.created_at',
			'users.updated_at'
		]);
	});
};

const userLogin = (userObj) => {

};

module.exports = {
	registerUser: registerUser,
	findUser: findUser
};
