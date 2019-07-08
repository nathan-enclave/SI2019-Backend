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
      start: Joi.date().required(),
      end: Joi.date().required()
    };
  }

  update() {
    return {
      name: Joi.string().required(),
      technology: Joi.string().required(),
      description: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required()
    };
  }
}

module.exports = ProjectValidator;
