const path = require('path');
const CustomModel = require('./CustomModel');

class Manager extends CustomModel {
  static get tableName() {
    return 'managers';
  }

  static get $hidden() {
    return ['password'];
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
      role: {
        relation: CustomModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, './Role'),
        join: {
          from: 'managers.roleId',
          to: 'roles.id'
        }
      }
    };
  }
}

module.exports = Manager;
