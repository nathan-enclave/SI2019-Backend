const BaseController = require('../../base/BaseController');
const DashboardService = require('./service');

class DashboardController extends BaseController {
  constructor() {
    // eslint-disable-next-line new-cap
    super(new DashboardService());
  }

  async cashFlow(request) {
    try {
      const { year } = request.params;
      return await this.service.cashFlow(year);
    } catch (err) {
      throw err;
    }
  }

  async getProject(request) {
    try {
      return await this.service.getProject(request.query);
    } catch (err) {
      throw err;
    }
  }

  async getTotal(request) {
    try {
      return await this.service.getTotal(request.query);
    } catch (err) {
      throw err;
    }
  }

  async salary(request) {
    try {
      return await this.service.salary(request.params);
    } catch (err) {
      throw err;
    }
  }

  async workStatus(request) {
    try {
      const { year } = request.params;
      return await this.service.workStatus(year);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = DashboardController;
