const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class AuthValidator extends BaseValidator {
  constructor() {
    super();
    this.login = this.login();
    this.register = this.register();
    this.update = this.update();
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

  update() {
    return {
      verify: Joi.number(),
      password: Joi.string()
    };
  }
}

module.exports = AuthValidator;
