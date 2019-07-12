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
    path: '/api/v1/dashboard/projects',
    config: Handler.getProject
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/engineers/status',
    config: Handler.getStatisticEngineerStatus
  }
];
module.exports = Routes;
