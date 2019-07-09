const BaseController = require('../../base/BaseController');
const SkillService = require('./service');

class SkillController extends BaseController {
  constructor() {
    super(new SkillService());
  }
}

module.exports = SkillController;
