const CategoriesController = require('./controller');
const CategoriesValidator = require('./validator');

const controller = new CategoriesController();
const validator = new CategoriesValidator();

exports.getMany = {
  description: 'Get Categories list',
  notes: 'Return Categories items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a Categories',
  notes: 'Return a Categories by id',
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
  description: 'Create a new Categories',
  notes: 'Return created Categories',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: false,
  validate: {
    payload: validator.create
  }
};

exports.updateOne = {
  description: 'Update Categories',
  notes: 'Return updated Categories by id',
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
  description: 'Delete a Categories',
  notes: 'Return deleted Categories by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};
