const DashboardController = require('./controller');

const controller = new DashboardController();

exports.getMany = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getMany.bind(controller),
  auth: false
};

exports.getStatisticEngineerStatus = {
  description: 'Get statistic of engineer status (available or not)',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerStatus.bind(controller),
  auth: false
};
