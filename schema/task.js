'use strict';

const createTask = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		description: {
			type: 'string',
			minLength: 1
		},
		service: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		}
	},
	additionalProperties: false,
	required: ['name', 'description', 'service']
};

module.exports = {
	createTask: createTask
};