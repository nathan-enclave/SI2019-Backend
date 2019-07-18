const Boom = require('boom');
// const _ = require('lodash');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');

class TeamService extends BaseService {
  constructor() {
    super(Models.Team);
  }

  async getMany(query) {
    let builder = this.model
      .queryBuilder(query)
      .joinRelation('projects')
      .where('teams.deletedAt', null)
      .select(
        'teams.id',
        'teams.name as teamName',
        'projects.name as projectName',
        'teams.deletedAt',
        Models.Team.relatedQuery('engineers')
          .count()
          .as('totalMember')
      );

    if (this.getSearchQuery && query.q) {
      builder = this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getOne(id) {
    try {
      const team = Models.Team.query()
        .findById(id)
        .joinRelation('projects')
        .eager('engineers(selectEngineer)', {
          selectEngineer: builder => {
            builder.select(
              'engineers.id',
              'engineers.firstName',
              'engineers.lastName',
              'engineer_team.role'
            );
          }
        })
        .select(
          'teams.id',
          'teams.name as teamName',
          'projects.name as projectName',
          'teams.createdAt',
          Models.Team.relatedQuery('engineers')
            .count()
            .as('totalMember')
        );

      if (!team) {
        throw Boom.notFound(`Model Team is not found`);
      }
      return team;
    } catch (error) {
      throw error;
    }
  }

  async createOne(payload) {
    try {
      const { engineers } = payload;

      delete payload.engineers;
      const team = await Models.Team.query()
        .insert(payload)
        .returning('id');

      engineers.forEach(e => {
        e.engineerId = e.id;
        e.teamId = team.id;
        delete e.id;
      });

      await Models.EngineerTeam.query().insertGraph(engineers);

      return team;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id, payload) {
    try {
      const { engineers } = payload;
      delete payload.engineers;
      const team = await Models.Team.query().patchAndFetchById(id, payload);
      if (!team) {
        throw Boom.notFound(`Team is not found`);
      }
      engineers.forEach(e => {
        e.engineerId = e.id;
        e.teamId = id;
        delete e.id;
      });
      await Models.EngineerTeam.query()
        .where('teamId', id)
        .delete();

      await Models.EngineerTeam.query().insertGraph(engineers);
      return team;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const result = await Models.Team.query()
        .findById(id)
        .update({
          deletedAt: new Date()
        })
        .returning('id', 'deletedAt');
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = TeamService;
