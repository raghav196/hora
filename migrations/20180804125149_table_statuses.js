'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('statuses', (table) => {
			table.string('status').primary();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at', false).defaultTo(knex.fn.now());
			table.timestamp('updated_at', false).defaultTo(knex.fn.now());
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('statuses')
	])
};
