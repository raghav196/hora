'use strict';

const Ajv = require('ajv');

const error = require('./error');

const userSchema = require('../schema/user');
const taskScehma = require('../schema/task');

const ajv = new Ajv({
	coerceTypes: true,
	format: 'full',
	verbose: true,
	removeAdditional: true
});

const validation = {};

validation.constructError = function(errors){
	console.log(errors);
	const err = errors[0];
	const dataPath = err.dataPath.replace('.', '');
	const errMessage = err.message;
	const message = `${dataPath} ${errMessage}`;

	return error._400(message.trim());
};


validation.USER = {
	registerUser: ajv.compile(userSchema.registerUser),
	userLogin: ajv.compile(userSchema.userLogin)
};

validation.TASK = {
	createTask: ajv.compile(taskScehma.createTask)
};



module.exports = validation;