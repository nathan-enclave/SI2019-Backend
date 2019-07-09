const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboard/projects',
    config: Handler.getMany
  }
];
module.exports = Routes;
