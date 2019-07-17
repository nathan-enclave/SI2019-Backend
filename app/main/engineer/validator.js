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
      avatar: Joi.string(),
      birthday: Joi.string().required(),
      address: Joi.string().required(),
      nationality: Joi.string(),
      dateIn: Joi.string(),
      salary: Joi.number().required(),
      email: super.strEmail().required(),
      skype: Joi.string().required(),
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
      avatar: Joi.string(),
      address: Joi.string(),
      nationality: Joi.string(),
      birthday: Joi.string(),
      dateIn: Joi.string(),
      dateOut: Joi.string(),
      salary: Joi.number(),
      email: super.strEmail(),
      skype: Joi.string(),
      status: Joi.number(),
      skills: Joi.array().items(Joi.number())
    };
  }
}
module.exports = EngineerValidator;
