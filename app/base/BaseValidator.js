const Joi = require('joi');

class BaseValidator {
  constructor() {
    this.idParam = this.idParam();
    this.queryParams = this.queryParams();
  }

  idNumber() {
    return Joi.number()
      .integer()
      .min(0);
  }

  idParam() {
    return Joi.string()
      .required()
      .description('id is required');
  }

  strEmail() {
    return Joi.string().email();
  }

  strPhoneNumber() {
    return Joi.string().regex(/^[0-9+ ]{10,15}$/);
  }

  strUsername() {
    return Joi.string()
      .min(3)
      .max(50)
      .alphanum();
  }

  strPassword() {
    return Joi.string();
  }

  queryParams() {
    return {
      limit: Joi.number()
        .min(1)
        // .max(100)
        .default(10),
      offset: Joi.number().default(0),
      orderBy: Joi.string(),
      filter: Joi.object(),
      fields: Joi.array()
    };
  }

  checkToken() {
    return Joi.object({
      Authorization: Joi.string()
    }).options({ allowUnknown: true });
  }
}

module.exports = BaseValidator;
