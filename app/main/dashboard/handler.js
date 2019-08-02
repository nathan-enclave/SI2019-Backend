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
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
// get cash flow
exports.cashFlow = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.cashFlow.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
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
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
exports.getStatisticEngineerStatus = {
  description: 'Get statistic of engineer status (available or not)',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticEngineerStatus.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
// get salary
exports.salary = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.salary.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
// get engineer working status
exports.workStatus = {
  description: 'Get dashboard',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.workStatus.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
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
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
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
exports.getStatistiProjectByYear = {
  description: 'Get statistic total project by month in year',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatistiProjectByYear.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
exports.getStatisticTeamAndProject = {
  description: 'Get statistic team, project and engineer',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatisticTeamAndProject.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};
exports.getStatistiProjectCategory = {
  description: 'Get statistic project bye category',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatistiProjectCategory.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  }
};

<<<<<<< HEAD
exports.getStatistiSalaryTeam = {
  description: 'Get statistic project bye category',
  notes: 'Return dashboard',
  tags: ['api', 'v1'],
  handler: controller.getStatistiSalaryTeam.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
=======
exports.getStatistiProjectLocation = {
  description: 'Get statistic total project in location in a year',
  notes: 'Return location and number project on each one ',
  tags: ['api', 'v1'],
  handler: controller.getStatistiProjectLocation.bind(controller),
  auth: {
    strategy: 'jwt',
    scope: ['Director', 'HR', 'PM']
  },
  validate: {
    query: {
      year: validator.year
    }
>>>>>>> cae23f85d4058708289ff80fe678691834a2fe0c
  }
};
