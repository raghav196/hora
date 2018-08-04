'use strict';

exports.seed = function(knex, Promise) {
  return Promise.try(() => {
    return knex('statuses').del();
  }).then(() => {
    const statuses = [
      {
        status: 'created'
      },
			{
				status: 'assigned'
			},
			{
				status: 'accepted'
			},
			{
				status: 'rejected'
			},
			{
				status: 'completed'
			}
    ];
    return knex('statuses').insert(statuses);
  })
};
