const LocationController = require('./controller');
const LocationValidator = require('./validator');

const controller = new LocationController();
const validator = new LocationValidator();

exports.getMany = {
  description: 'Get all cities in dataset',
  notes: 'Return city items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get data of location',
  notes: 'Return a location by id',
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
  description: 'Create a new location',
  notes: 'Return created location',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: false,
  validate: {
    payload: validator.create
  }
};

exports.updateOne = {
  description: 'Update location',
  notes: 'Return updated location by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    },
    payload: validator.update
  }
};

exports.deleteOne = {
  description: 'Delete a location',
  notes: 'Return deleted location by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};
