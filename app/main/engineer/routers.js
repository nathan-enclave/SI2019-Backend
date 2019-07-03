const Handler = require('./handler');

const Routes = [
  
  {
    method: 'GET',
    path: '/api/v1/engineers/{id}',
    config: Handler.getOne
  }
]
module.exports = Routes;
