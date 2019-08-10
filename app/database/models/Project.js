const path = require('path');
const CustomModel = require('./CustomModel');

class Project extends CustomModel {
  static get tableName() {
    return 'projects';
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
      team: {
        relation: CustomModel.HasOneRelation,
        modelClass: path.join(__dirname, './Team'),
        join: {
          from: 'teams.projectId',
          to: 'projects.id'
        }
      },
      category: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Category'),
        join: {
          from: 'projects.categoryId',
          to: 'categories.id'
        }
      },
      location: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Location'),
        join: {
          from: 'projects.locationId',
          to: 'locations.id'
        }
      }
    };
  }
}
module.exports = Project;
