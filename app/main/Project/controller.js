const BaseController = require('../../base/BaseController');
const ProjectService = require('./service');

class ProjectController extends BaseController {
  constructor() {
    super(new ProjectService());
  }

  async getProjectByProgress() {
    try {
      return await this.service.getProjectByProgress();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProjectController;
