const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class SkillValidator extends BaseValidator {
  constructor() {
    super();
    this.create = this.create();
    this.update = this.update();
  }

  create() {
    return {
      name: Joi.string().required()
    };
  }

  update() {
    return {
      name: Joi.string()
    };
  }
}

module.exports = SkillValidator;
