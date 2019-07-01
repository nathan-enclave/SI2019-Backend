const path = require('path');
const CustomModel = require('./CustomModel');

class Engineer extends CustomModel {
  static get tableName() {
    return 'engineers';
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      teams: {
        relation: CustomModel.ManyToManyRelation,
        modelClass: path.join(__dirname, './Team'),
        join: {
          from: 'engineers.id',
          through: {
            from: 'engineer_team.engineerId',
            to: 'engineer_team.teamId'
          },
          to: 'teams.id'
        }
      },
      skills: {
        relation: CustomModel.ManyToManyRelation,
        modelClass: path.join(__dirname, './Skill'),
        join: {
          from: 'engineers.id',
          through: {
            from: 'engineer_skill.engineerId',
            to: 'engineer_skill.skillId'
          },
          to: 'skills.id'
        }
      }
    };
  }
}

module.exports = Engineer;
