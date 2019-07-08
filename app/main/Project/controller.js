const BaseController = require('../../base/BaseController');
const ProjectService = require('./service');

class ProjectController extends BaseController {
  constructor() {
    super(new ProjectService());
  }
}

module.exports = ProjectController;
