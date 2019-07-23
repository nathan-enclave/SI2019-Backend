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
        .where('deletedAt', null)
        .andWhere('dateOut', null)
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
        .where('deletedAt', null)
        .andWhere('dateOut', null)
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

  // get salary
  async getSalary() {
    try {
      return Models.Engineer.query()
        .whereNull('dateOut')
        .whereNull('deletedAt')
        .select('birthday', 'salary');
    } catch (error) {
      throw error;
    }
  }

  async salary() {
    try {
      let totalSalary = 0;
      let sumAge = 0;
      const salary = await this.getSalary();
      // total and avg salary
      const array = _.map(salary, 'salary');
      for (let i = 0; i < array.length; i += 1) {
        totalSalary += array[i];
      }
      const avgSalary = Math.round(totalSalary / array.length);
      // avg birthday
      const birthday = _.map(salary, 'birthday');
      for (let i = 0; i < birthday.length; i += 1) {
        sumAge += moment().diff(birthday[i], 'years');
      }
      const avgAge = Math.round(sumAge / birthday.length);

      if (salary.length === 0) {
        throw Boom.notFound(`Not found`);
      }
      return {
        totalSalary,
        avgSalary,
        avgAge
      };
    } catch (error) {
      throw error;
    }
  }

  // work status
  async getWorkStatusHired(year) {
    try {
      return Models.Engineer.query()
        .whereRaw(`DATE_PART('year', "dateIn")=${year}`)
        .whereNull('deletedAt')
        .select('dateIn');
    } catch (error) {
      throw error;
    }
  }

  async getWorkStatusLeft(year) {
    try {
      return Models.Engineer.query()
        .whereRaw(`DATE_PART('year', "dateOut")=${year}`)
        .whereNull('deletedAt')
        .select('dateOut');
    } catch (error) {
      throw error;
    }
  }

  async workStatus(year) {
    try {
      const statusHired = await this.getWorkStatusHired(year);
      const statusLeft = await this.getWorkStatusLeft(year);
      if (statusHired.length === 0) {
        throw Boom.notFound(`Not found`);
      } else {
        const hired = _.map(statusHired, 'dateIn');
        const left = _.map(statusLeft, 'dateOut');
        for (let index = 0; index < hired.length; index += 1) {
          hired[index] = moment(hired[index]).month();
        }
        for (let index = 0; index < left.length; index += 1) {
          left[index] = moment(left[index]).month();
        }
        const workStatus = [];
        for (let i = 0; i < 12; i += 1) {
          const numHired = hired.filter(x => x === i).length;
          const numLeft = left.filter(x => x === i).length;
          workStatus.push({
            month: i + 1,
            numHired,
            numLeft
          });
        }
        return workStatus;
      }
    } catch (error) {
      throw error;
    }
  }

  async getStatisticProjectEarningByMonth(year) {
    try {
      const project = await Models.Project.query()
        .whereRaw(`DATE_PART('year', start)=${year}`)
        .andWhere('status', 'inProgress')
        .select('id', 'name', 'start', 'end', 'earning', 'earningPerMonth', 'status');
      return {
        results: project,
        total: project.length
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DashboardService;
