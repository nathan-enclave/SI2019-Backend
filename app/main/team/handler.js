const TeamController = require('./controller');
const TeamValidator = require('./validator');

const controller = new TeamController();
const validator = new TeamValidator();

exports.getMany = {
  description: 'Get Team list',
  notes: 'Return full team available and unavailable',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get one team informantion',
  notes: 'Return team information in details ',
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
  description: 'Create a new Team',
  notes: 'Return created team',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
  validate: {
    payload: validator.create
  }
};

exports.updateOne = {
  description: 'Update Team',
  notes: 'Return updated Team by id',
  tags: ['api', 'v1'],
  handler: controller.updateOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
  validate: {
    params: {
      id: validator.idParam
    },
    payload: validator.update
  }
};

exports.deleteOne = {
  description: 'Delete a Team',
  notes: 'Return deleted Team by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
  validate: {
    params: {
      id: validator.idParam
    }
  }
};
