/* eslint no-undef: 0 */

const server = require('../../app');
const knex = require('../../app/database/connection');
const utils = require('../utils');
const { USER_ROLE } = require('../../app/constants');

describe('Testing user and auth API', () => {
  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await utils.loadFixture(['roles', 'users']);
  });

  afterAll(async () => {
    await knex.migrate.rollback();
  });

  describe('GET /api/v1/users', async () => {
    test('<200> should get all user', async () => {
      const response = await server.inject(
        utils.withAuth(
          {
            method: 'GET',
            url: '/api/v1/users'
          },
          'admin'
        )
      );

      expect(response.statusCode).toBe(200);
      expect(response.result.results).toHaveLength(3);
      expect(response.result.total).toBe(3);
    });
  });

  describe('POST /api/v1/users', async () => {
    test('<200> should create user success', async () => {
      const payload = {
        fullName: 'Developer',
        username: 'developer',
        password: 'codebase',
        roleId: USER_ROLE.USER
      };

      const response = await server.inject(
        utils.withAuth(
          {
            method: 'POST',
            url: '/api/v1/users',
            payload
          },
          'admin'
        )
      );

      expect(response.statusCode).toBe(200);
      const users = await knex.select('*').from('users');
      expect(users).toHaveLength(4);
    });
  });

  describe('GET /api/v1/users/{id}', async () => {
    test('<200> should get activity type success by id', async () => {
      const response = await server.inject(
        utils.withAuth(
          {
            method: 'GET',
            url: '/api/v1/users/4'
          },
          'admin'
        )
      );

      expect(response.statusCode).toBe(200);
      expect(response.result.id).toBe(4);
    });
  });

  describe('PUT /api/v1/users/{id}', async () => {
    test('<200> should update activity type success by id', async () => {
      const payload = {
        fullName: 'SuperAdmin'
      };
      const response = await server.inject(
        utils.withAuth(
          {
            method: 'PUT',
            url: '/api/v1/users/4',
            payload
          },
          'admin'
        )
      );
      expect(response.statusCode).toBe(200);
      const updatedRes = await knex
        .select('*')
        .from('users')
        .where('id', 4)
        .limit(1);

      expect(updatedRes[0].fullName).toMatch('SuperAdmin');
    });
  });

  describe('DELETE /api/v1/users/{id}', async () => {
    test('<200> should delete activity type success by id', async () => {
      const response = await server.inject(
        utils.withAuth(
          {
            method: 'DELETE',
            url: '/api/v1/users/4'
          },
          'admin'
        )
      );
      expect(response.statusCode).toBe(200);
      const users = await knex.select('*').from('users');
      expect(users).toHaveLength(4);
      const user = await knex
        .select('*')
        .from('users')
        .where('id', 4)
        .limit(1);

      expect(user[0].fullName).toMatch('SuperAdmin');
      expect(user[0].isDisabled).toBeTruthy();
    });
  });

  describe('POST /api/v1/auth/login', async () => {
    test('<200> should login user success', async () => {
      const payload = {
        username: 'admin',
        password: 'codebase'
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
        fullName: 'Test',
        username: 'Test',
        password: 'codebase'
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
