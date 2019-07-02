const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class EngineerValidator extends BaseValidator {
  constructor() {
    super();
    this.create = this.create();
    this.update = this.update();
  }

}
module.exports = EngineerValidator;
