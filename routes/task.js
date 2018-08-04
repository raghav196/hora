'use strict';

const P = require('bluebird');
const _ = require('lodash');

const taskController = require('../controllers/taskController');

const authMiddleware = require('../middlewares/auth');

const validation = require('../utils/validation');
const error = require('../utils/error');



module.exports = (router) => {

	router.post('/tasks/create', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			if(!validation.TASK.createTask(req.body)){
				throw validation.constructError(validation.TASK.createTask.errors);
			}

			return taskController.createTask(req);
		}).then((data) => {
			res.status(201).json({
				success: true,
				data: data
			});
		})
	});


	router.put('/tasks/:task_id/assign', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			return taskController.assignTask(req);
		}).then((data) => {
			res.status(201).json({
				success: true,
				data: data
			});
		})
	});


	router.put('/tasks/:task_id/accept', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			return taskController.acceptTask(req);
		}).then((data) => {
			res.status(201).json({
				success: true,
				data: data
			});
		})
	});


	router.put('/tasks/:task_id/reject', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			return taskController.rejectTask(req);
		}).then((data) => {
			res.status(201).json({
				success: true,
				data: data
			});
		})
	});


	router.put('/tasks/:task_id/complete', [authMiddleware.verifyToken], (req, res) => {
		return P.try(() => {
			return taskController.completeTask(req);
		}).then((data) => {
			res.status(201).json({
				success: true,
				data: data
			});
		})
	});

};