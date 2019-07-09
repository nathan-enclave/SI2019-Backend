const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/Skill',
    config: Handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/Skill/{id}',
    config: Handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/Skill',
    config: Handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/Skill/{id}',
    config: Handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/Skill/{id}',
    config: Handler.deleteOne
  }
];

module.exports = Routes;
