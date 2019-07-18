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
  },
  {
    method: 'POST',
    path: '/api/v1/auth/forget',
    config: Handler.check
  },
  {
    method: 'POST',
    path: '/api/v1/auth/forget/sendcode',
    config: Handler.sendcode
  },
  {
    method: 'POST',
    path: '/api/v1/auth/forget/resetPassword/{id}',
    config: Handler.reset
  }
];

module.exports = Routes;
