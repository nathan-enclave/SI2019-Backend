const Boom = require('boom');
const _ = require('lodash');

const jwt = require('../../services/jwt');
const PasswordUtils = require('../../services/password');
const Models = require('../../database/models');
const CONSTANTS = require('../../constants');

class AuthService {
  async login(payload) {
    try {
      const { username, password } = payload;
      const user = await Models.Manager.query()
        .findOne({ username })
        .joinRelation('role')
        .select('managers.*', 'role.name as scope', 'managers.password as hashPassword');
      if (!user) {
        return Boom.conflict('User is not found');
      }

      if (!user.hashPassword) {
        return Boom.conflict('User can not login with username and password');
      }

      const isCorrectPassword = await PasswordUtils.compare(password, user.hashPassword);
      if (!isCorrectPassword) {
        return Boom.forbidden('Incorrect password');
      }

      const data = _.pick(user, ['username', 'id', 'scope']);
      return _.assign({ token: jwt.issue(data) }, data);
    } catch (error) {
      throw error;
    }
  }

  async register(payload) {
    try {
      const { username, password } = payload;
      const user = await Models.Manager.query().findOne({ username });
      if (user) {
        return Boom.conflict('User is exist');
      }

      const hashPassword = await PasswordUtils.hash(password);
      const result = await Models.Manager.query().insert({
        username,
        password: hashPassword,
        roleId: CONSTANTS.USER_ROLE.ADMIN
      });
      result.scope = 'admin';
      const data = _.pick(result, ['username', 'id', 'scope']);
      return _.assign({ token: jwt.issue(data) }, data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
