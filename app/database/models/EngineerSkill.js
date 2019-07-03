const path = require('path');
const CustomModel = require('./CustomModel');

class EngineerSkill extends CustomModel {
  static get tableName() {
    return 'engineer_skill';
  }

  static get relationMappings() {
    return {
      engineer: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Engineer'),
        join: {
          from: 'engineer_skill.engineerId',
          to: 'engineers.id'
        }
      },
      skill: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Skill'),
        join: {
          from: 'engineer_skill.skillId',
          to: 'skills.id'
        }
      }
    };
  }
}

module.exports = EngineerSkill;
