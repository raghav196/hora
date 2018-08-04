'use strict';

const registerUser = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		email: {
			type: 'string',
			format: 'email'
		},
		role: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 64
		},
		country_code: {
			type: 'string',
			minLength: 2,
			maxLength: 3
		},
		phone: {
			type: 'string',
			minLength: 10,
			maxLength: 10
		}
	},
	additionalProperties: false,
	required: ['name', 'email', 'password']
};

const userLogin = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'email'
		},
		role: {
			type: 'string',
			minLength: 1,
			maxLength: 255
		},
		password: {
			type: 'string',
			minLength: 1
		}
	},
	additionalProperties: false,
	required: ['email', 'password', 'role']
};

module.exports = {
	registerUser: registerUser,
	userLogin: userLogin
};