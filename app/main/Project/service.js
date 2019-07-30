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
            builder.select('teams.name', 'teams.id');
          }
        })
        .mergeEager('category(selectCategory)', {
          selectCategory: builder => {
            builder.select('categories.name', 'categories.id');
          }
        })
        .select(
          'id',
          'name',
          'technology',
          'description',
          'earning',
          'earningPerMonth',
          'start',
          'end',
          'status'
        );
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      return result;
    } catch (error) {
      console.log(error);

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

  // get many
  async getMany(query) {
    try {
      const result = await Models.Project.queryBuilder(query)
        .whereNull('deletedAt')
        .eager('category(selectCategory)', {
          selectCategory: builder => {
            builder.select('categories.name');
          }
        })
        .select('id', 'name', 'technology', 'earning', 'status');
      if (result.length === 0) {
        throw Boom.notFound('Not found');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getManyBy(query) {
    try {
      const { status } = query;
      const result = await Models.Project.queryBuilder(query)
        .where('status', status)
        .whereNull('deletedAt')
        .eager('category(selectCategory)', {
          selectCategory: builder => {
            builder.select('categories.name');
          }
        })
        .select('id', 'name', 'technology', 'earning', 'status');
      if (result.length === 0) {
        throw Boom.notFound('Not found');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async sumEarning() {
    try {
      const result = await Models.Project.query()
        .whereNull('deletedAt')
        .sum('earning');
      return result;
    } catch (error) {
      throw Boom.conflict(error);
    }
  }
}

module.exports = projectService;
