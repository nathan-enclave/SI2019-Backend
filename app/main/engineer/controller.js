const BaseController = require('../../base/BaseController');
const EngineerService = require('./service');

class EnginnerController extends BaseController {
  constructor() {
    super(new EngineerService());
  }
}

module.exports = EnginnerController;
