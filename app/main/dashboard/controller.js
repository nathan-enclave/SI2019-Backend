const BaseController = require('../../base/BaseController');
const dashboardService = require('./service');

class dashboardController extends BaseController {
  constructor() {
    // eslint-disable-next-line new-cap
    super(new dashboardService());
  }
}

module.exports = dashboardController;
