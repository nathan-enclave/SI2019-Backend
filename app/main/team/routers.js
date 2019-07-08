const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/teams',
    config: Handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/teams/{id}',
    config: Handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/teams',
    config: Handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/teams/{id}',
    config: Handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/teams/{id}',
    config: Handler.deleteOne
  }
];

module.exports = Routes;
