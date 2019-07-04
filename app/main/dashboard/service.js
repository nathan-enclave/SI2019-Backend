const _ = require('lodash');
const Models = require('../../database/models/index');
// const BaseService = require('../../base/BaseService');

class dashboardService {
  // eslint-disable-next-line consistent-return
  async count(model, name) {
    try {
      return model
        .query()
        .whereNull('deletedAt')
        .count(`id as ${name}`)
        .first();
    } catch (error) {
      console.log(error);
    }
  }

  async countMn(model, name) {
    try {
      return model
        .query()
        .count(`id as ${name}`)
        .first();
    } catch (error) {
      throw error;
    }
  }

  async getMany() {
    const engineer = await this.count(Models.Engineer, 'Engineer');
    const project = await this.count(Models.Project, 'Project');
    const team = await this.count(Models.Team, 'Team');
    const manager = await this.countMn(Models.Manager, 'Manager');
    return [engineer, project, team, manager];
  }
}
module.exports = dashboardService;
