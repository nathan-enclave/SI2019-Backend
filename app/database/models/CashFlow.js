// const path = require('path');
const CustomModel = require('./CustomModel');

class CashFlow extends CustomModel {
  static get tableName() {
    return 'cash_flows';
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = CashFlow;
