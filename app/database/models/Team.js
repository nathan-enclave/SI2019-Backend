const path = require('path');
const CustomModel = require('./CustomModel');

class Team extends CustomModel {
  static get tableName() {
    return 'teams';
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
      engineers: {
        relation: CustomModel.ManyToManyRelation,
        modelClass: path.join(__dirname, './Engineer'),
        join: {
          from: 'teams.id',
          through: {
            from: 'engineer_team.teamId',
            to: 'engineer_team.engineerId'
          },
          to: 'engineers.id'
        }
      },
      projects: {
        relation: CustomModel.HasOneRelation,
        modelClass: path.join(__dirname, './Project'),
        join: {
          from: 'teams.projectId',
          to: 'projects.id'
        }
      }
    };
  }
}

module.exports = Team;
