const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class ProjectValidator extends BaseValidator {
  constructor() {
    super();
    this.create = this.create();
    this.update = this.update();
  }

  create() {
    return {
      name: Joi.string().required(),
      technology: Joi.string().required(),
      description: Joi.string().required(),
      earning: Joi.number(),
      earningPerMonth: Joi.number(),
      start: Joi.date().required(),
      end: Joi.date().required(),
      status: Joi.string().default('pending'),
      categoryId: Joi.number()
    };
  }

  update() {
    return {
      name: Joi.string(),
      technology: Joi.string(),
      description: Joi.string(),
      earning: Joi.number(),
      earningPerMonth: Joi.number(),
      start: Joi.date(),
      end: Joi.date(),
      status: Joi.string(),
      categoryId: Joi.number()
    };
  }
}

module.exports = ProjectValidator;
