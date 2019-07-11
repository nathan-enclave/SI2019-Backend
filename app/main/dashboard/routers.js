const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboard/total',
    config: Handler.getMany
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
  }
];
module.exports = Routes;
