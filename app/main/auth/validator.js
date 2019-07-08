// const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class AuthValidator extends BaseValidator {
  constructor() {
    super();
    this.login = this.login();
    this.register = this.register();
  }

  login() {
    return {
      username: super.strUsername().required(),
      password: super.strPassword().required()
    };
  }

  register() {
    return {
      username: super.strUsername().required(),
      password: super.strPassword().required()
    };
  }
}

module.exports = AuthValidator;
