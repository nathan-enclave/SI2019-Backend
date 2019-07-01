const path = require('path');
const CustomModel = require('./CustomModel');

class Role extends CustomModel {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    return {
      managers: {
        relation: CustomModel.HasManyRelation,
        modelClass: path.join(__dirname, './Manager'),
        join: {
          from: 'roles.id',
          to: 'managers.roleId'
        }
      }
    };
  }
}

module.exports = Role;
