const DashboardController = require('./controller');
const DashboardValidator = require('./validator');

const controller = new DashboardController();
const validator = new DashboardValidator();
// get total
exports.getTotal = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getTotal.bind(controller),
  auth: false
};
// get cash flow
exports.cashFlow = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.cashFlow.bind(controller),
  auth: false,
  validate: {
    params: {
      year: validator.idParam
    }
  }
};
// get project status
exports.getProject = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getProject.bind(controller),
  auth: false
};
// get salary
exports.salary = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.salary.bind(controller),
  auth: false
};
// get engineer working status
exports.workStatus = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.workStatus.bind(controller),
  auth: false,
  validate: {
    params: {
      year: validator.idParam
    }
  }
};
