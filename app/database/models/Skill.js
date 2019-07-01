const path = require('path');
const CustomModel = require('./CustomModel');

class Skill extends CustomModel {
  static get tableName() {
    return 'skills';
  }

  static get relationMappings() {
    return {
      engineers: {
        relation: CustomModel.ManyToManyRelation,
        modelClass: path.join(__dirname, './Engineer'),
        join: {
          from: 'skills.id',
          through: {
            from: 'engineer_skill.skillId',
            to: 'engineer_skill.engineerId'
          },
          to: 'engineers.id'
        }
      }
    };
  }
}

module.exports = Skill;
