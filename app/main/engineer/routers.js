const Handler = require('./handler');

const Routes = [
  {
    method: 'GET',
    path: '/api/v1/engineers',
    config: Handler.getMany
  },
  {
    method: 'GET',
    path: '/api/v1/engineers/{id}',
    config: Handler.getOne
  },
  {
    method: 'POST',
    path: '/api/v1/engineers',
    config: Handler.createOne
  },
  {
    method: 'PUT',
    path: '/api/v1/engineers/{id}',
    config: Handler.updateOne
  },
  {
    method: 'DELETE',
    path: '/api/v1/engineers/{id}',
    config: Handler.deleteOne
  }
];

module.exports = Routes;
