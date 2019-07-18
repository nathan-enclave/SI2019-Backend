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
    path: '/api/v1/auth/forget/{email}',
    config: Handler.check
  },
  {
    method: 'POST',
    path: '/api/v1/auth/forget/sendcode/{email}',
    config: Handler.sendcode
  },
  {
    method: 'POST',
    path: '/api/v1/auth/forget/resetPassword/{id}',
    config: Handler.reset
  }
];

module.exports = Routes;
