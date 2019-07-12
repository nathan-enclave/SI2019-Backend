const DashboardController = require('./controller');
const DashboardValidator = require('./validator');

const controller = new DashboardController();
const validator = new DashboardValidator();

exports.getTotal = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getTotal.bind(controller),
  auth: false
};
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
exports.getProject = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getProject.bind(controller),
  auth: false
};

exports.getStatisticEngineerStatus = {
  description: 'Get statistic of engineer status (available or not)',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerStatus.bind(controller),
  auth: false
};
