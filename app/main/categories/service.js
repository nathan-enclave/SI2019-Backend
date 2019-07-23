// const Boom = require('boom');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');

class CategoriesService extends BaseService {
  constructor() {
    super(Models.Category);
  }
}

module.exports = CategoriesService;
