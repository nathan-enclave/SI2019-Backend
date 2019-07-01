const path = require('path');
const CustomModel = require('./CustomModel');

class EngineerTeam extends CustomModel {
  static get tableName() {
    return 'engineer_team';
  }

  static get relationMappings() {
    return {
      team: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Team'),
        join: {
          from: 'engineer_team.teamId',
          to: 'teams.id'
        }
      },
      engineer: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Engineer'),
        join: {
          from: 'engineer_team.engineerId',
          to: 'engineers.id'
        }
      }
    };
  }
}

module.exports = EngineerTeam;
