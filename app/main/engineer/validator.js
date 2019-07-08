const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class EngineerValidator extends BaseValidator {
  constructor() {
    super();
    this.create = this.create();
    this.update = this.update();
  }

  create() {
    return {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      englishName: Joi.string().required(),
      phoneNumber: super.strPhoneNumber().required(),
      address: Joi.string().required(),
      email: super.strEmail().required(),
      skype: super.strEmail().required(),
      expYear: Joi.number().required(),
      status: Joi.number().required(),
      skills: Joi.array().items(Joi.number())
    };
  }

  update() {
    return {
      firstName: Joi.string(),
      lastName: Joi.string(),
      englishName: Joi.string(),
      phoneNumber: super.strPhoneNumber(),
      address: Joi.string(),
      email: super.strEmail(),
      skype: super.strEmail(),
      expYear: Joi.number(),
      status: Joi.number(),
      skills: Joi.array().items(Joi.number())
    };
  }
}
module.exports = EngineerValidator;
