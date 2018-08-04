'use strict';

const P = require('bluebird');
const _ = require('lodash');
const db = require('../db/knex').db;

const constants = require('../configs/constants');
const error = require('../utils/error');

exports.createTask = (taskObj) => {
	return P.try(() => {
		return db('tasks').insert(taskObj, ['*']);
	});
};


exports.assignTask = (taskId, workerId) => {
	return P.try(() => {
		return db('tasks').update({
			status: constants.STATUSES.ASSIGNED,
			worker: workerId
		}, ['*']).where({
			id: taskId
		})
	});
};

exports.acceptTask = (taskId, workerId) => {
	return P.try(() => {
		return db('tasks').update({
			status: constants.STATUSES.ACCEPTED
		}, ['*']).where({
			id: taskId
		});
	});
};

exports.rejectTask = (taskId, workerId) => {
	return P.try(() => {
		return db('tasks').update({
			status: constants.STATUSES.REJECTED
		}, ['*']).where({
			id: taskId
		});
	});
};

exports.completeTask = (taskId, workerId) => {
	return P.try(() => {
		return db('tasks').update({
			status: constants.STATUSES.COMPLETED
		}, ['*']).where({
			id: taskId
		});
	});
};

exports.getTasksOfConsumer = (consumerId) => {
	return P.try(() => {
		let query = db('tasks').innerJoin('users', function(){
			this.on('tasks.consumer', '=', 'users.id');
		});

		query = query.where('tasks.status', '=', constants.STATUSES.COMPLETED);

		query = query.where('tasks.consumer', '=', consumerId);
		return query.select([
			'tasks.id',
			'tasks.name',
			'tasks.status',
			'tasks.description',
			'tasks.service',
			'tasks.worker',
			'users.name AS consumer_name',
			'users.email AS consumer_email'
		]);
	})
};


exports.getTasksOfWorker = (workerId) => {
	return P.try(() => {
		let query = db('tasks').innerJoin('users', function(){
			this.on('tasks.worker', '=', 'users.id');
		});

		query = query.where('tasks.status', '=', constants.STATUSES.COMPLETED);

		query = query.where('tasks.worker', '=', workerId);
		return query.select([
			'tasks.id',
			'tasks.name',
			'tasks.status',
			'tasks.description',
			'tasks.service',
			'tasks.worker',
			'users.name AS worker_name',
			'users.email AS worker_email'
		]);
	}).then((tasks) => {
		return _.groupBy(tasks, (e) => {return e.status});
	})
};

exports.getTaskById = (taskId) => {
	return P.try(() => {
		return db('tasks').select(['*']).where({
			id: taskId
		});
	});
};

// module.exports = {
// 	createTask: createTask,
// 	assignTask: assignTask,
// 	acceptTask: acceptTask,
// 	rejectTask: rejectTask,
// 	completeTask: completeTask,
// 	getTasksOfConsumer: getTasksOfConsumer,
// 	getTaskById: getTaskById
// };