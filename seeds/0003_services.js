'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.try(() => {
    return knex('services').del();
  }).then(() => {
    const services = [
      {
        service: 'plumbing'
      },
			{
				service: 'electrician'
			},
			{
				service: 'cleaning'
			}
    ];

    return knex('services').insert(services);
  })
};
