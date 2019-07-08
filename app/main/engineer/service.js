const Boom = require('boom');
// const _ = require('lodash');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
// const PasswordUtils = require('../../services/password');
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
            builder.select('skills.name');
          }
        })
        .mergeEager(
          'teams(selectTeam)', // select Team
          {
            selectTeam: builder => {
              builder
                .joinRelation('projects')
                .select('teams.name as teamName', 'projects.name as projectName'); // select project
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
          'email',
          'skype',
          'expYear',
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
  async createOne(payload) {
    const { skills } = payload;
    delete payload.skills;
    const engineer = await Models.Engineer.query().insert(payload);
    await engineer.$relatedQuery('skills').relate(skills);
    return engineer;
  }

  async updateOne(id, payload) {
    try {
      const { skills } = payload;
      delete payload.skills;
      const engineer = await Models.Engineer.query().patchAndFetchById(id, payload);
      if (!engineer) {
        throw Boom.notFound(`Engineer is not found`);
      }
      await engineer.$relatedQuery('skills').unrelate();
      await engineer.$relatedQuery('skills').relate(skills);
      const skillList = await Models.Skill.query()
        .whereIn('id', skills)
        .select('id', 'name');
      engineer.skills = skillList;
      return engineer;
    } catch (error) {
      throw error;
    }
  }

  // start delete (update deleteAt)
  async deleteOne(id) {
    try {
      const result = await Models.Engineer.query()
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
  // end delete
}
module.exports = EngineerService;
