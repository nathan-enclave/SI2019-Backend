const Boom = require('boom');
// const _ = require('lodash');
const moment = require('moment');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
// const PasswordUtils = require('../../services/password');

const Firebase = require('../../services/firebase');

class EngineerService extends BaseService {
  constructor() {
    super(Models.Engineer);
  }

  // start GetOne
  async getOne(id) {
    try {
      const result = await Models.Engineer.query() // select skill
        .findById(id)
        .eager('skills(selectSkill)', {
          selectSkill: builder => {
            builder.select('skills.id', 'skills.name', 'expYear');
          }
        })
        .mergeEager(
          'teams(selectTeam)', // select Team
          {
            selectTeam: builder => {
              builder
                .joinRelation('projects')
                .select(
                  'teams.name as teamName',
                  'engineer_team.role as role',
                  'engineer_team.dateJoin as dateJoin',
                  'projects.name as projectName',
                  'projects.start as projectStartDay',
                  'projects.end as projectEndDay'
                ); // select project
            }
          }
        )
        .select(
          'id',
          'firstName',
          'lastName',
          'englishName',
          'phoneNumber',
          'address',
          'birthday',
          'avatar',
          'salary',
          'dateIn',
          'email',
          'skype',
          'avatar',
          'expYear',
          'overTime',
          'dayOffRemain',
          'status'
        );
      const n = result.teams.length;
      result.totalProject = n;
      if (!result) {
        throw Boom.notFound(`Not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  // end GetOne
  async createOne(payload, authData) {
    try {
      const { skills } = payload;
      delete payload.skills;
      payload.birthday = moment(payload.birthday);
      payload.dateIn = moment(payload.dateIn);
      payload.expYear = moment().diff(payload.dateIn, 'year', false);
      const engineer = await Models.Engineer.query().insert(payload);
      await engineer
        .$relatedQuery('skills')
        .relate(skills)
        .returning('*');

      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'info',
        action: `created ${engineer.englishName}'s profile`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return engineer;
    } catch (error) {
      throw Boom.notFound('Not Found');
    }
  }

  async updateOne(id, payload, authData) {
    try {
      let skills = null;
      if (payload.skills) {
        /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
        skills = payload.skills;
        delete payload.skills;
      }
      if (payload.birthday) {
        payload.birthday = moment(payload.birthday);
      }
      if (payload.dateIn) {
        payload.dateIn = moment(payload.dateIn);
        payload.expYear = moment().diff(payload.dateIn, 'year', false);
      }
      if (payload.dateOut) {
        payload.dateOut = moment(payload.dateOut);
      }
      const engineer = await Models.Engineer.query().patchAndFetchById(id, payload);
      if (!engineer) {
        throw Boom.notFound(`Engineer is not found`);
      }
      if (skills) {
        await engineer.$relatedQuery('skills').unrelate();
        await engineer.$relatedQuery('skills').relate(skills);
      }

      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'success',
        action: `updated ${engineer.englishName}'s profile`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);

      return engineer;
    } catch (error) {
      throw error;
    }
  }

  // start delete (update deleteAt)
  async deleteOne(id, authData) {
    try {
      const result = await Models.Engineer.query()
        .findById(id)
        .update({
          deletedAt: new Date()
        })
        .returning('id', 'englishName', 'deletedAt');
      if (!result) {
        throw Boom.notFound(`Not found`);
      }

      const fireStoreData = {
        userId: authData.id,
        name: authData.englishName,
        fullName: `${authData.firstName} ${authData.lastName} (${authData.englishName})`,
        role: authData.scope,
        status: 'warning',
        action: `deleted ${result.englishName}'s profile`,
        time: moment().format()
      };
      Firebase.save(fireStoreData);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // end delete
}
module.exports = EngineerService;
