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
      expYear: Joi.number().required(),
      avatar: Joi.string(),
      birthday: Joi.string().required(),
      gender: Joi.string(),
      address: Joi.string().required(),
      nationality: Joi.string(),
      dateIn: Joi.string(),
      salary: Joi.number().required(),
      email: super.strEmail().required(),
      skype: Joi.string().required(),
      status: Joi.number().required(),
      skills: Joi.array().items(
        Joi.object({
          id: Joi.number().required(),
          expYear: Joi.number().required()
        })
      )
    };
  }

  update() {
    return {
      firstName: Joi.string(),
      lastName: Joi.string(),
      englishName: Joi.string(),
      phoneNumber: super.strPhoneNumber(),
      expYear: Joi.number(),
      avatar: Joi.string(),
      address: Joi.string(),
      nationality: Joi.string(),
      birthday: Joi.string(),
      gender: Joi.string(),
      dateIn: Joi.string(),
      dateOut: Joi.string(),
      dayOffRemain: Joi.number(),
      overTime: Joi.number(),
      salary: Joi.number(),
      email: super.strEmail(),
      skype: Joi.string(),
      status: Joi.number(),
      skills: Joi.array().items(
        Joi.object({
          id: Joi.number(),
          expYear: Joi.number()
        })
      )
    };
  }

  queryParams() {
    return {
      limit: Joi.number()
        .min(1)
        .default(10),
      offset: Joi.number().default(0),
      orderBy: Joi.string(),
      filter: Joi.object(),
      fields: Joi.array(),
      q: Joi.string()
    };
  }
}
module.exports = EngineerValidator;
