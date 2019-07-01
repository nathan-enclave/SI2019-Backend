const { QueryBuilder } = require('objection');
const { buildFilter } = require('objection-filter');
const _ = require('lodash');
const Model = require('./config');

class CustomQueryBuilder extends QueryBuilder {
  // Some custom method.
  upsert(model) {
    if (model.id) {
      return this.update(model).where('id', model.id);
    }
    return this.insert(model);
  }

  queryBuilder(query) {
    if (query.page && query.pageSize) {
      return this.page(query.page, query.pageSize);
    }

    return this.page(0, 50);
  }
}

class CustomModel extends Model {
  static get QueryBuilder() {
    return CustomQueryBuilder;
  }

  static get $isMultiTenantModel() {
    return false;
  }

  static queryBuilder(query) {
    return buildFilter(this).build(query);
  }

  $formatJson(json) {
    let superJson = super.$formatJson(json);
    if (this.constructor.$hidden && this.constructor.$hidden.length > 0) {
      superJson = _.omit(superJson, this.constructor.$hidden);
    }
    return superJson;
  }
}

module.exports = CustomModel;
