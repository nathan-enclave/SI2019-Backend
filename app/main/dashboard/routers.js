const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboard/total',
    config: Handler.getTotal
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/cashflow/{year}',
    config: Handler.cashFlow
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/projects/status',
    config: Handler.getProject
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/salary',
    config: Handler.salary
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/workstatus/{year}',
    config: Handler.workStatus
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/engineers/status',
    config: Handler.getStatisticEngineerStatus
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/projects/earning/{year}',
    config: Handler.getStatisticProjectEarningByMonth
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/engineers/sw',
    config: Handler.getStatisticEngineerSw
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/engineers/salary',
    config: Handler.getStatisticEngineerSalary
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/engineers/gender',
    config: Handler.getStatisticEngineerGender
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/totalProject/{year}',
    config: Handler.getStatistiProjectByYear
  }
];
module.exports = Routes;
