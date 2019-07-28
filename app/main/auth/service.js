const Boom = require('boom');
const _ = require('lodash');

const jwt = require('../../services/jwt');
const PasswordUtils = require('../../services/password');
const sendEmail = require('../../services/sendEmail');
const Models = require('../../database/models');
// const CONSTANTS = require('../../constants');

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

      const adminInformation = await Models.Engineer.query()
        .findById(user.engineerId)
        .select('firstName', 'lastName', 'englishName');
      const data = _.assign(
        _.pick(user, ['username', 'id', 'scope', 'engineerId']),
        adminInformation
      );
      return _.assign({ token: jwt.issue(data) }, data);
    } catch (error) {
      throw error;
    }
  }

  async register(payload) {
    try {
      const { username, password, engineerId } = payload;
      const user = await Models.Manager.query().findOne({ username });
      if (user) {
        return Boom.conflict('User is exist');
      }
      const roleId = _.sample([2, 3]);
      const hashPassword = await PasswordUtils.hash(password);
      const result = await Models.Manager.query().insert({
        username,
        password: hashPassword,
        roleId,
        engineerId
      });
      result.scope = roleId === 2 ? 'HR' : 'PM';
      const data = _.pick(result, ['username', 'id', 'scope']);
      return _.assign({ token: jwt.issue(data) }, data);
    } catch (error) {
      throw error;
    }
  }

  // check email
  async check(payload) {
    try {
      const { email } = payload;
      let result;
      const numCode = Math.floor(Math.random() * 100000) + 10000; // get random number
      const checkEmail = await Models.Engineer.query()
        .where('email', email)
        .select('id');
      if (checkEmail.length === 0) {
        throw Boom.notFound('Engieer is not found');
      }
      const idEng = Number(_.map(checkEmail, 'id'));
      const checkRole = await Models.Manager.query()
        .update({ verify: numCode })
        .where('engineerId', idEng);
      if (checkRole.length === 0) {
        throw Boom.forbidden('User has no permistion');
      }

      const getIdManager = await Models.Manager.query()
        .where('engineerId', idEng)
        .select('id');
      const id = Number(_.map(getIdManager, 'id'));
      if (!getIdManager) {
        throw Boom.forbidden('Not Found');
      } else {
        result = `${email} is can changer password`;
      }
      return { result, email, id };
    } catch (error) {
      throw error;
    }
  }

  // send verify code

  async sendcode(payload) {
    try {
      const { email } = payload;
      const title = `Verify code reset password`;
      let result;
      const checkEmail = await Models.Engineer.query()
        .where('email', email)
        .select('id');
      const id = Number(_.map(checkEmail, 'id'));
      const checkRole = await Models.Manager.query()
        .where('engineerId', id)
        .select('verify');
      if (!id) {
        throw Boom.forbidden(`${email} Not exits`);
      }
      if (checkRole.length === 0) {
        throw Boom.forbidden(`${email} Not is manager`);
      }
      const verifycode = Number(_.map(checkRole, 'verify'));
      const conten = `user verify code to reset password ${verifycode}`;
      try {
        sendEmail.sendEmail(email, title, conten);
        result = `sended`;
      } catch (error) {
        throw Boom.forbidden(error);
      }
      return result;
    } catch (error) {
      throw Boom.forbidden(error);
    }
  }

  // reset pasword
  async reset(id, payload) {
    try {
      let result;
      const { verify, password } = payload;
      const hashPassword = await PasswordUtils.hash(password);
      try {
        const checkVerify = await Models.Manager.query()
          .where('id', id)
          .select('verify');
        const pickVerify = Number(checkVerify.map(e => e.verify));
        if (verify === pickVerify) {
          const update = await Models.Manager.query()
            .findById(id)
            .update({ password: `${hashPassword}`, verify: null })
            .returning('id', 'username');
          result = 'Complete';
          if (!update) {
            return Boom.conflict('fail');
          }
        } else {
          return Boom.conflict('verify incorect');
        }
      } catch (error) {
        throw error;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
