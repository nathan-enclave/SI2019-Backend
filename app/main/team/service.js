/* eslint-disable no-await-in-loop */
const Boom = require('boom');
const _ = require('lodash');
const moment = require('moment');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
const sendEmail = require('../../services/sendEmail');
const Firebase = require('../../services/firebase');

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
        'teams.name',
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
        .eager('engineers(selectEngineer)', {
          selectEngineer: builder => {
            builder.select(
              'engineers.id',
              'engineers.firstName',
              'engineers.lastName',
              'engineers.avatar',
              'engineers.email',
              'engineers.expYear',
              'engineer_team.role',
              'engineer_team.dateJoin',
              'engineers.birthday',
              'engineers.salary'
            );
          }
        })
        .mergeEager('projects(selectProject)', {
          selectProject: builder => {
            builder.select('projects.id', 'projects.name');
          }
        })
        .select(
          'teams.id',
          'teams.name',
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

  pickEmail(id) {
    try {
      return Models.Engineer.query()
        .where('id', id)
        .select('engineers.email')
        .first();
    } catch (error) {
      throw error;
    }
  }

  async createOne(payload, authData) {
    try {
      const { name } = payload;
      const { engineers } = payload;
      const { projectId } = payload;
      const updateStatusProject = await Models.Project.query()
        .update({ status: 'inProgress' })
        .where('id', projectId)
        .returning('id as idProjects', 'name', 'status');
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
      const title = 'Join new team';
      const idEngineer = _.map(engineers, 'engineerId');
      const roleEngineer = _.map(engineers, 'role');
      let statusEmail;
      for (let i = 0; i < idEngineer.length; i += 1) {
        const { email } = await this.pickEmail(idEngineer[i]);
        const content = ` We have added you to the team ${name} with role ${roleEngineer[i]}.`;
        try {
          sendEmail.sendEmail(email, title, content);
          statusEmail = 'Has send email to all member of team';
        } catch (error) {
          throw Boom.forbidden('Not successful');
        }
      }
      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'info',
        action: `created ${team.name}`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return { team, statusEmail, updateStatusProject };
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id, payload, authData) {
    try {
      const { engineers } = payload;
      delete payload.engineers;
      const team = await Models.Team.query().patchAndFetchById(id, payload);
      if (!team) {
        throw Boom.notFound(`Team is not found`);
      }
      if (engineers) {
        engineers.forEach(e => {
          e.engineerId = e.id;
          e.teamId = id;
          delete e.id;
        });
        await Models.EngineerTeam.query()
          .where('teamId', id)
          .delete();
        await Models.EngineerTeam.query().insertGraph(engineers);
      }
      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'success',
        action: `updated ${team.name}'s information`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return team;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id, authData) {
    try {
      const result = await Models.Team.query()
        .findById(id)
        .update({
          deletedAt: new Date()
        })
        .returning('id', 'deletedAt', 'name');
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'warning',
        action: `deleted ${result.name}`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = TeamService;
