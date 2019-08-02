const BaseController = require('../../base/BaseController');
const LocationService = require('./service');

class LocationController extends BaseController {
  constructor() {
    super(new LocationService());
  }
}

module.exports = LocationController;
