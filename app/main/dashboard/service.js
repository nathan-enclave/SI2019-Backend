const _ = require('lodash');
const moment = require('moment');
const Boom = require('boom');

const Models = require('../../database/models/index');
// const BaseService = require('../../base/BaseService');
class DashboardService {
  async count(model, name) {
    try {
      return model
        .query()
        .whereNull('deletedAt')
        .count(`id as ${name}`)
        .first();
    } catch (error) {
      throw error;
    }
  }

  async countManager(model, name) {
    try {
      return model
        .query()
        .count(`id as ${name}`)
        .first();
    } catch (error) {
      throw error;
    }
  }

  async getTotal() {
    const engineer = await this.count(Models.Engineer, 'Engineer');
    const project = await this.count(Models.Project, 'Project');
    const team = await this.count(Models.Team, 'Team');
    const manager = await this.countManager(Models.Manager, 'Manager');
    return {
      engineer: engineer.Engineer,
      project: project.Project,
      team: team.Team,
      manager: manager.Manager
    };
  }

  // dashboard cash flow
  async pickCash(year) {
    try {
      return Models.CashFlow.query()
        .where('year', year)
        .select('month', 'cashIn', 'cashOut');
    } catch (error) {
      throw error;
    }
  }

  async pickProject(year) {
    try {
      return Models.Project.query()
        .whereRaw(`DATE_PART('year', start)=${year}`)
        .select('id', 'start');
    } catch (error) {
      throw error;
    }
  }

  async cashFlow(year) {
    const cash = await this.pickCash(year);
    if (cash.length === 0) {
      throw Boom.notFound(`Not found`);
    }
    const project = await this.pickProject(year);
    try {
      let result;
      if (project.length === 0) {
        throw Boom.notFound(`Not found`);
      } else {
        project.forEach(e => {
          e.start = moment(e.start).month();
        });
        result = _.countBy(project, 'start');
      }
      for (let i = 0; i < cash.length; i += 1) {
        cash[i].numOfProject = result[i];
      }

      return cash;
    } catch (error) {
      throw error;
    }
  }

  // count project
  async countProject(statusPro) {
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

  async getProject() {
    const inProgress = await this.countProject('inProgress');
    const pending = await this.countProject('pending');
    const done = await this.countProject('done');
    return {
      inProgress: inProgress.inProgress,
      pending: pending.pending,
      done: done.done
    };
  }

  // Status of engineers in company (Available or in team)
  async getStatisticEngineerStatus() {
    try {
      const engineers = await Models.Engineer.query()
        .whereNull('deletedAt')
        .select('id', 'status');
      const availableCounr = _.filter(engineers, e => e.status === 1).length;
      return {
        totalEngineer: engineers.length,
        available: availableCounr,
        inTeam: engineers.length - availableCounr
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DashboardService;
