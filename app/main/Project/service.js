const Boom = require('boom');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
// const PasswordUtils = require('../../services/password');

class projectService extends BaseService {
  constructor() {
    super(Models.Project);
  }

  // start getOne project
  async getOne(id) {
    try {
      const result = await Models.Project.query()
        .findById(id)
        .eager('team(selectTeam)', {
          selectTeam: builder => {
            builder.select('teams.name');
          }
        })
        .select('id', 'name', 'technology', 'description', 'start', 'end');
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // end getOne project
  // start createOne project
  async createOne(payload) {
    try {
      const result = await Models.Project.query().insert(payload);
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  // start createOne project

  // start deleteOne Project
  async deleteOne(id) {
    try {
      const result = await Models.Project.query()
        .findById(id)
        .update({
          deletedAt: new Date()
        })
        .returning('id', 'name', 'deletedAt');
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  // end deleteOne Project

  async count(statusofProject) {
    try {
      return Models.Project.query()
        .where({
          status: statusofProject
        })
        .count(`id as ${statusofProject}`)
        .first();
    } catch (error) {
      throw error;
    }
  }

  async getProjectByProgress() {
    const inProgress = await this.count('inProgress');
    const pending = await this.count('pending');
    const done = await this.count('done');
    return {
      inProgress: inProgress.inProgress,
      pending: pending.pending,
      done: done.done
    };
  }
}

module.exports = projectService;
