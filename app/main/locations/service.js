// const Boom = require('boom');
const Models = require('../../database/models/index');
const BaseService = require('../../base/BaseService');

class LocationService extends BaseService {
  constructor() {
    super(Models.Location);
  }
}

module.exports = LocationService;
