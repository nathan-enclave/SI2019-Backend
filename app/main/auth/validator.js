const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class AuthValidator extends BaseValidator {
  constructor() {
    super();
    this.login = this.login();
    this.register = this.register();
    this.update = this.update();
    this.email = this.email();
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

  email() {
    return {
      email: Joi.string().required()
    };
  }
}

module.exports = AuthValidator;
