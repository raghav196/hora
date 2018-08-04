'use strict';

const P = require('bluebird');
const _ = require('lodash');
const moment = require('moment');

const constants = require('../configs/constants');
const Service = require('../models/service');
const Task = require('../models/task');

const error = require('../utils/error');

const createTask = (req) => {
	return P.try(() => {
		return Service.getService(req.body.service);
	}).then((service) => {
		if(_.isEmpty(service)){
			throw error._400('Service not found');
		}

		const task = req.body;

		task.date_time = moment.utc().format();
		task.status = constants.STATUSES.CREATED;
		task.consumer = req.user.user_id;

		return Task.createTask(task);
	}).then((taskAdded) => {
		return {
			task: taskAdded[0]
		};
	})
};


const assignTask =(req) => {
	return P.try(() => {
		return Task.getTaskById(req.params.task_id);
	}).then((task) => {
		if(_.isEmpty(task)){
			throw error._404('Task not found');
		}

		return Task.assignTask(req.params.task_id, req.body.worker);
	}).then((taskAssigned) => {
		return {
			task: taskAssigned[0]
		};
	});
};

const acceptTask = (req) => {
	return P.try(() => {
		return Task.getTaskById(req.params.task_id);
	}).then((task) => {
		if(_.isEmpty(task)){
			throw error._404('Task not found');
		}

		if(task[0].status !== constants.STATUSES.ASSIGNED){
			throw error._400('Task not assigned yet');
		}

		if(task[0].worker !== req.user.user_id){
			throw error._400('Not assigned to you');
		}
		return Task.acceptTask(req.params.task_id, req.user.user_id);
	}).then((taskAccepted) => {
		return {
			task: taskAccepted[0]
		};
	});
};

const rejectTask = (req) => {
	return P.try(() => {
		return Task.getTaskById(req.params.task_id);
	}).then((task) => {
		if(_.isEmpty(task)){
			throw error._404('Task not found');
		}

		if(task[0].status !== constants.STATUSES.ASSIGNED){
			throw error._400('Task not assigned yet');
		}

		if(task[0].worker !== req.user.user_id){
			throw error._400('Not assigned to you');
		}
		return Task.rejectTask(req.params.task_id, req.user.user_id);
	}).then((taskRejected) => {
		return {
			task: taskRejected[0]
		};
	});
};


const completeTask = (req) => {
	return P.try(() => {
		return Task.getTaskById(req.params.task_id);
	}).then((task) => {
		if(_.isEmpty(task)){
			throw error._404('Task not found');
		}

		if(task[0].status !== constants.STATUSES.ACCEPTED){
			throw error._400('Task not accepted yet');
		}

		if(task[0].worker !== req.user.user_id){
			throw error._400('Not accepted to you');
		}
		return Task.completeTask(req.params.task_id);
	}).then((taskCompleted) => {
		return {
			task: taskCompleted[0]
		};
	});
};

module.exports = {
	createTask: createTask,
	assignTask: assignTask,
	acceptTask: acceptTask,
	rejectTask: rejectTask,
	completeTask: completeTask
};