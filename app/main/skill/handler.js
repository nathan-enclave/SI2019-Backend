const SkillController = require('./controller');
const SkillValidator = require('./validator');

const controller = new SkillController();
const validator = new SkillValidator();

exports.getMany = {
  description: 'Get Skill list',
  notes: 'Return Skill items',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false,
  validate: {
    query: validator.queryParams
  }
};

exports.getOne = {
  description: 'Get a Skill',
  notes: 'Return a Skill by id',
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
  description: 'Create a new Skill',
  notes: 'Return created Skill',
  tags: ['api', 'v1'],
  handler: controller.createOne.bind(controller),
  auth: false,
  validate: {
    payload: validator.create
  }
};

exports.updateOne = {
  description: 'Update Skill',
  notes: 'Return updated Skill by id',
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
  description: 'Delete a Skill',
  notes: 'Return deleted Skill by id',
  tags: ['api', 'v1'],
  handler: controller.deleteOne.bind(controller),
  auth: false,
  validate: {
    params: {
      id: validator.idParam
    }
  }
};

exports.statistic = {
  description: 'Skill statistic ratio',
  notes: 'Return skill used by engineer in ratio',
  tags: ['api', 'v1'],
  handler: controller.skillStatistic.bind(controller),
  auth: false
};
