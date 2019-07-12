const BaseController = require('../../base/BaseController');
const DashboardService = require('./service');

class DashboardController extends BaseController {
  constructor() {
    super(new DashboardService());
  }

  async getStatisticEngineerStatus() {
    try {
      return await this.service.getStatisticEngineerStatus();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DashboardController;
