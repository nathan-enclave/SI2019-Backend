const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboard',
    config: Handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/dashboard/statistic/engineers/status',
    config: Handler.getStatisticEngineerStatus
  }
];
module.exports = Routes;
