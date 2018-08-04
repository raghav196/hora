'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('tasks', (table) => {
			table.increments('id');
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.string('service').references('service').inTable('services').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.timestamp('date_time', false).defaultTo(knex.fn.now());
			table.string('status').references('status').inTable('statuses').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.uuid('consumer').references('id').inTable('users').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.uuid('worker').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE').index();
			table.timestamp('created_at', false).defaultTo(knex.fn.now());
			table.timestamp('updated_at', false).defaultTo(knex.fn.now());
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('tasks')
	])
};
