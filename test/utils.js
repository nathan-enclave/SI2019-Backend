/* eslint no-restricted-syntax: 0 */
/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
/* eslint no-await-in-loop: 0 */

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const knex = require('../app/database/connection');

async function loadFixture(fixtures) {
  for (const fixture of fixtures) {
    const batch = require(`./fixtures/${fixture}.js`);
    await knex(fixture).insert(batch);
  }
}

function withAuth(options, role) {
  const user = {
    username: 'admin',
    id: 1,
    scope: role
  };
  const authToken = jwt.sign(user, 'Enclave');
  return _.assign(options, {
    headers: { Authorization: `Bearer ${authToken}` }
  });
}

module.exports = {
  loadFixture,
  withAuth
};
