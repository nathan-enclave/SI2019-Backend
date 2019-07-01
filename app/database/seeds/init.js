// const bcrypt = require('bcrypt');
const faker = require('faker');
const Models = require('../models');
// const { SALT_ROUNDS } = require('../../constants');
const Factory = require('../factory');
const samples = require('../factory/samples');

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('managers')
    .del()
    .then(() => knex('roles').del())
    .then(async () =>
      Models.Role.query().insertGraph([
        {
          name: 'superadmin',
          description: 'Admin with highest AUTHORITY'
        },
        {
          name: 'admin',
          description: 'Admin'
        }
      ])
    )
   
