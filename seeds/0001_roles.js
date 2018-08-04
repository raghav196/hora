'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.try(() => {
		return knex('roles').del();
  }).then(() => {
    const roles = [
      {
        role: 'worker'
      },
      {
        role: 'consumer'
      }
    ];

    return knex('roles').insert(roles);
  });
};
