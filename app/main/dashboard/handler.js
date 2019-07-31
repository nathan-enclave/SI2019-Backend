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
exports.getStatisticEngineerStatus = {
  description: 'Get statistic of engineer status (available or not)',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerStatus.bind(controller),
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

// get statistic of project earning by month in the year
exports.getStatisticProjectEarningByMonth = {
  description: 'Get statistic of project earning by month in the year',
  notes: 'Return earning each month',
  tags: ['api', 'v1'],
  handler: controller.getStatisticProjectEarningByMonth.bind(controller),
  auth: false,
  validate: {
    params: {
      year: validator.idParam
    }
  }
};
exports.getStatisticEngineerSw = {
  description: 'Get statistic of engineer level',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerSw.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
exports.getStatisticEngineerSalary = {
  description: 'Get statistic of engineer level',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerSalary.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
exports.getStatisticEngineerGender = {
  description: 'Get statistic of engineer gender',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerGender.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
