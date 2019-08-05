const Boom = require('boom');
const moment = require('moment');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
const Firebase = require('../../services/firebase');

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
        .joinRelation('location')
        .select(
          'projects.id',
          'projects.name',
          'projects.technology',
          'projects.description',
          'projects.earning',
          'projects.earningPerMonth',
          'projects.start',
          'projects.end',
          'projects.status',
          'location.id as locationId',
          'location.city',
          'location.country'
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
  async createOne(payload, authData) {
    try {
      if (!payload.earningPerMonth) {
        const period = moment(payload.end).diff(payload.start, 'month', false);
        payload.earningPerMonth = payload.earning / period;
      }
      const project = await Models.Project.query().insert(payload);
      if (!project) {
        throw Boom.notFound(`Not found`);
      }
      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'info',
        action: `created project: ${project.name}`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return project;
    } catch (error) {
      throw error;
    }
  }

  // end createOne project

  // start updateOne project
  async updateOne(id, payload, authData) {
    try {
      const project = await this.model.query().patchAndFetchById(id, payload);
      if (!project) {
        throw Boom.notFound(`${this.modelName} not found`);
      }
      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'success',
        action: `updated project: ${project.name}`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return project;
    } catch (error) {
      throw error;
    }
  }
  // end updateOne project

  // start deleteOne Project
  async deleteOne(id, authData) {
    try {
      const project = await Models.Project.query()
        .findById(id)
        .update({
          deletedAt: new Date()
        })
        .returning('id', 'name', 'deletedAt');
      if (!project) {
        throw Boom.notFound(`Not found`);
      }

      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'warning',
        action: `deleted project: ${project.name}`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return project;
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
        .select('id', 'name', 'technology', 'earning', 'status', 'start', 'end');
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
