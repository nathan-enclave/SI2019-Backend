// const Boom = require('boom');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
// const PasswordUtils = require('../../services/password');

class SkillService extends BaseService {
  constructor() {
    super(Models.Skill);
  }
}

module.exports = SkillService;
