// const bcrypt = require('bcrypt');
const Models = require('../models');
// const { SALT_ROUNDS } = require('../../constants');

exports.seed = knex =>
  // Deletes ALL existing entries
  // knex('managers')
  //   .del()
  // .then(() => knex('roles').del())
  knex('roles')
    .del()
    .then(async () =>
      Models.Role.query().insertGraph([
        {
          name: 'superadmin',
          description: 'Admin with highest AUTHORITY'
        },
        {
          name: 'admin',
          description: 'Normal Admin'
        }
      ])
    );
