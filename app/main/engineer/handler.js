const EnginnerController = require('./controller');
const EngineerValidator = require('./validator');

const controller = new EnginnerController();
const validator = new EngineerValidator();

exports.getOne = {
  description: 'Get a Engineer',
  notes: 'Return a User by id',
  tags: ['api', 'v1'],
  handler: controller.getOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.createOne = {
  description: 'Create a new Engineer',
  notes: 'Return created User',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: false,
  validate: {
    payload: validator.create
  }
};
