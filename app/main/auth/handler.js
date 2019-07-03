const AuthController = require('./controller');
const AuthValidator = require('./validator');

const controller = new AuthController();
const validator = new AuthValidator();

exports.login = {
  description: 'Login to an account',
  notes: 'Return user and token',
  tags: ['api', 'v1'],
  handler: controller.login.bind(controller),
  auth: false,
  validate: {
    payload: validator.login
  }
};

exports.register = {
  description: 'Register an account to system',
  notes: 'Return user and token',
  tags: ['api', 'v1'],
  handler: controller.register.bind(controller),
  auth: false,
  validate: {
    payload: validator.register
  }
};
