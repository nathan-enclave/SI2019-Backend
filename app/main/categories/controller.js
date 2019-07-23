const BaseController = require('../../base/BaseController');
const CategoriesService = require('./service');

class CategoriesController extends BaseController {
  constructor() {
    super(new CategoriesService());
  }

  async skillStatistic() {
    try {
      return await this.service.skillStatistic();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoriesController;
