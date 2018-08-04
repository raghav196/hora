'use strict';

const P = require('bluebird');
const _ = require('lodash');

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/auth');

const validation = require('../utils/validation');
const error = require('../utils/error');

module.exports = (router) => {

	router.post('/users/register', (req, res) => {
		return P.try(() => {
			if(!validation.USER.registerUser(req.body)){
				throw validation.constructError(validation.USER.registerUser.errors);
			}

			return userController.registerUser(req);
		}).then((data) => {
			res.status(201).json({
				success: true,
				data: data
			});
		})
	});

	router.post('/users/login', (req, res) => {
		return P.try(() => {
			if(!validation.USER.userLogin(req.body)){
				throw validation.constructError(validation.USER.userLogin.errors);
			}

			return userController.login(req);
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	});

	// router.get('/users', (req, res) => {
	//
	// });

	router.get('/users/tasks', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			return userController.getConsumerTasks(req);
		}).then((data) => {
			return res.status(200).json({
				success: true,
				data: data
			});
		});
	})

};