// const _ = require('lodash');
const Models = require('../../database/models/index');
// const BaseService = require('../../base/BaseService');

class dashboardService {
  // count project
  async count(statusPro) {
    try {
      return Models.Project.query()
        .where({
          status: statusPro
        })
        .count(`id as ${statusPro}`)
        .first();
    } catch (error) {
      throw error;
    }
  }

  async getMany() {
    const progress = await this.count('progress');
    const pending = await this.count('pending');
    const done = await this.count('done');
    return {
      progress: progress.progress,
      pending: pending.pending,
      done: done.done
    };
  }
}
module.exports = dashboardService;
