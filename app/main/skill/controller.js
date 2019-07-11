const BaseController = require('../../base/BaseController');
const SkillService = require('./service');

class SkillController extends BaseController {
  constructor() {
    super(new SkillService());
  }

  async skillStatistic() {
    try {
      return await this.service.skillStatistic();
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  }
}

module.exports = SkillController;
