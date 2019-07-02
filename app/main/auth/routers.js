const Handler = require('./handler');

const Routes = [
  {
    method: 'POST',
    path: '/api/v1/auth/register',
    config: Handler.register
  },
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    config: Handler.login
  }
];

module.exports = Routes;
