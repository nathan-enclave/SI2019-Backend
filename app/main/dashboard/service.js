const _ = require('lodash');
const Models = require('../../database/models/index');
// const BaseService = require('../../base/BaseService');

class dashboardService {
  // eslint-disable-next-line consistent-return
  async count(model, name) {
    // console.log(model, name);
    try {
      return model
        .query()
        .count(`id as ${name}`)
        .first();
    } catch (error) {
      console.log(error);
    }
  }

  async getMany() {
    const engineer = await this.count(Models.Engineer, 'Engineer');
    const project = await this.count(Models.Project, 'Project');
    const team = await this.count(Models.Team, 'Team');
    // eslint-disable-next-line no-sequences
    return [engineer, project, team];
  }
}
module.exports = dashboardService;
