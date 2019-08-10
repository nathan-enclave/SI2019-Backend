const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/projects',
    config: Handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/projects/groupBy',
    config: Handler.getManyBy
  },
  {
    method: 'GET',
    path: '/api/v1/projects/{id}',
    config: Handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/projects',
    config: Handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/projects/{id}',
    config: Handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/projects/{id}',
    config: Handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/projects/sumEarning',
    config: Handler.sumEarning
  }
];

module.exports = Routes;
