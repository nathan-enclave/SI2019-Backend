const ProjectController = require('./controller');
const ProjectValidator = require('./validator');

const controller = new ProjectController();
const validator = new ProjectValidator();

exports.getMany = {
  description: 'Get project list',
  notes: 'Return project items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};
exports.getManyBy = {
  description: 'Group project',
  notes: 'Group project by status',
  tags: ['api', 'v1'],
  handler: controller.getManyBy.bind(controller),
  auth: false,
  validate: {
    query: validator.getStatus
  }
};

exports.getOne = {
  description: 'Get a project',
  notes: 'Return a project by id',
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
  description: 'Create a new project',
  notes: 'Return created project',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: false,
  validate: {
    payload: validator.create
  }
};

exports.updateOne = {
  description: 'Update project',
  notes: 'Return updated project by id',
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
  description: 'Delete a project',
  notes: 'Return deleted project by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};
exports.sumEarning = {
  description: 'Get sum eaning of all project',
  notes: 'Return sum earning',
  tags: ['api', 'v1'],
  handler: controller.sumEarning.bind(controller),
  auth: false
};
