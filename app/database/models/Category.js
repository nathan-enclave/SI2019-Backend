const path = require('path');
const CustomModel = require('./CustomModel');

class Category extends CustomModel {
  static get tableName() {
    return 'categories';
  }

  static get relationMappings() {
    return {
      projects: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, './Project'),
        join: {
          from: 'categories.id',
          to: 'projects.categoryId'
        }
      }
    };
  }
}

module.exports = Category;
