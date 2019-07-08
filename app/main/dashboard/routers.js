const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/dashboard',
    config: Handler.getMany
  }
];
module.exports = Routes;
