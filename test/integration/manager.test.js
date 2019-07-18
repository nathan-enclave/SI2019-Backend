/* eslint no-undef: 0 */

const server = require('../../app');
const knex = require('../../app/database/connection');
const utils = require('../utils');
// const { USER_ROLE } = require('../../app/constants');

describe('Testing user and auth API', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await utils.loadFixture(['roles', 'managers']);
  });

  afterAll(async () => {
    await knex.migrate.rollback();
  });

  describe('POST /api/v1/auth/login', async () => {
    test('<200> should login user success', async () => {
      const payload = {
        username: 'admin',
        password: '123456'
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        payload
      });

      expect(response.statusCode).toBe(200);
      expect(response.result.token).not.toBeUndefined();
    });
  });

  describe('POST /api/v1/auth/register', async () => {
    test('<200> should register user success', async () => {
      const payload = {
        username: 'admin6',
        password: '123456',
        engineerId: 67
      };

      const response = await server.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload
      });

      expect(response.statusCode).toBe(200);
      expect(response.result.token).not.toBeUndefined();
    });
  });
});
