const EnginnerController = require('./controller');
const EngineerValidator = require('./validator');

const controller = new EnginnerController();
const validator = new EngineerValidator();

exports.getMany = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};
