'use strict';

const P = require('bluebird');
const _ = require('lodash');
const uuid = require('uuid');
const debug = require('debug')('HORA:controllers/user');

const Role = require('../models/role');
const User = require('../models/user');
const Task = require('../models/task');

const authUtil = require('../utils/auth');
const error = require('../utils/error');

const registerUser = (req) => {
	return P.try(() => {
		return User.findUser(null, req.body.email);
	}).then((userInfo) => {

		if(!_.isEmpty(userInfo)){
			throw error._409('User already exists.');
		}
		return Role.getRoleByName(req.body.role);
	}).then((role) => {
		if (_.isEmpty(role)) {
			throw error._404('Role not found.');
		}

		const user = {};
		user.id = uuid.v4();
		user.role_id = role[0].id;

		return P.try(() => {
			user.name = req.body.name;
			user.email = req.body.email;


			if(req.body.country_code){
				user.country_code = req.body.country_code;
			}
			if(req.body.phone){
				user.phone = req.body.phone;
			}

			return P.try(() => {
				return authUtil.hashPassword(req.body.password).then((hashedUserPassword) => {
					user.password = hashedUserPassword;
				});
			});
		}).then(() => {

			return User.registerUser(user);

		}).then((userInserted) => {
			return User.findUser(userInserted[0].id, req.body.email);
		}).then((userInfo) => {
			return {
				user: _.omit(userInfo[0], ['password'])
			};
		})

	});
};

const getUser = (req) => {

};

const login = (req) => {
	return P.try(() => {
		return Role.getRoleByName(req.body.role);
	}).then((role) => {
		if(_.isEmpty(role)){
			throw error._400('Please select a valid role');
		}

		const ROLE_ID = role[0].id;
		return User.findUser(null, req.body.email, ROLE_ID);
	}).then((user) => {
		if(_.isEmpty(user)){
			throw error._404('User does not exists/invalid role');
		}

		debug('USER PASSWORD');
		debug(user[0].password);
		debug(req.body.password);
		return P.try(() => {
			return authUtil.verifyPassword(user[0].password, req.body.password);
		}).then((match) => {
			debug('MATCH');
			debug(match);
			if(!match){
				throw error._401('Wrong Password');
			}

			const payload = {
				user_id: user[0].id,
				email: user[0].email,
				role: user[0].role
			};
			return authUtil.generateToken(payload);
		}).then((userToken) => {
			if(userToken){
				user[0].token = userToken.token;
				user[0].issued_at = userToken.issued_at;
				user[0].expires_at = userToken.expires_at;
			}

			return {
				user: _.omit(user[0], ['password'])
			};
		})

	})
};


const getConsumerTasks = (req) => {
	return P.try(() => {
		if(req.user.role === 'consumer'){
			return Task.getTasksOfConsumer(req.user.user_id);
		}else{
			return Task.getTasksOfWorker(req.user.user_id)
		}
	}).then((userTasks) => {
		return {
			tasks: userTasks
		};
	});
};

module.exports = {
	registerUser: registerUser,
	getUser: getUser,
	login: login,
	getConsumerTasks: getConsumerTasks
};