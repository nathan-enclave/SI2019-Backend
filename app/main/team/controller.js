const BaseController = require('../../base/BaseController');
const TeamService = require('./service');

class TeamController extends BaseController {
  constructor() {
    super(new TeamService());
  }
}

module.exports = TeamController;
