const BaseController = require('../../base/BaseController');
const ProjectService = require('./service');

class ProjectController extends BaseController {
  constructor() {
    super(new ProjectService());
  }

  async getManyBy(request) {
    try {
      const { status } = request.params;
      return await this.service.getManyBy(status);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProjectController;
