const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/skills',
    config: Handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/skills/{id}',
    config: Handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/skills',
    config: Handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/skills/{id}',
    config: Handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/skills/{id}',
    config: Handler.deleteOne
  },
  {
    method: 'GET',
    path: '/api/v1/skills/statistic/ratio',
    config: Handler.statistic
  }
];

module.exports = Routes;
