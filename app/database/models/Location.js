const path = require('path');
const CustomModel = require('./CustomModel');

class Location extends CustomModel {
  static get tableName() {
    return 'locations';
  }

  static get relationMappings() {
    return {
      projects: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, './Project'),
        join: {
          from: 'locations.id',
          to: 'projects.locationId'
        }
      }
    };
  }
}

module.exports = Location;
