// const Boom = require('boom');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');
// const PasswordUtils = require('../../services/password');

class SkillService extends BaseService {
  constructor() {
    super(Models.Skill);
  }

  async skillStatistic() {
    try {
      let skill = Models.EngineerSkill.query()
        .join('skills', 'engineer_skill.skillId', 'skills.id')
        .groupBy('skillId', 'skills.name')
        .count('engineerId')
        .select('skillId', 'skills.name');
      let engineer = Models.Engineer.query()
        .whereNull('deletedAt')
        .andWhere('dateOut', null)
        .count('id')
        .first();
      [engineer, skill] = await Promise.all([engineer, skill]);
      const totalEngineer = engineer.count;
      skill.forEach(e => {
        e.ratio = e.count / totalEngineer;
      });
      return skill;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SkillService;
