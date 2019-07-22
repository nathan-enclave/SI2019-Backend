const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class TeamValidator extends BaseValidator {
  constructor() {
    super();
    this.create = this.create();
    this.update = this.update();
  }

  create() {
    return {
      teamName: Joi.string().required(),
      projectId: Joi.number().required(),
      engineers: Joi.array().items(
        Joi.object({
          id: this.idNumber(),
          role: Joi.string()
        })
      )
    };
  }

  update() {
    return {
      teamName: Joi.string(),
      projectId: Joi.number(),
      engineers: Joi.array().items(
        Joi.object({
          id: this.idNumber(),
          role: Joi.string()
        })
      )
    };
  }
}
module.exports = TeamValidator;
