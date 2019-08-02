const Joi = require('joi');
const BaseValidator = require('../../base/BaseValidator');

class DashboardValidator extends BaseValidator {
  constructor() {
    super();
    this.year = this.year();
  }

  year() {
    return Joi.number()
      .integer()
      .min(0);
  }
}
module.exports = DashboardValidator;
