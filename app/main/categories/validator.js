const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class CategoriesValidator extends BaseValidator {
  constructor() {
    super();
    this.create = this.create();
    this.update = this.update();
  }

  create() {
    return {
      name: Joi.string().required(),
      description: Joi.string().required()
    };
  }

  update() {
    return {
      name: Joi.string(),
      description: Joi.string()
    };
  }
}

module.exports = CategoriesValidator;
