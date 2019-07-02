const AuthService = require('./service');

class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  login(request) {
    try {
      return this.service.login(request.payload);
    } catch (err) {
      throw err;
    }
  }

  register(request) {
    try {
      return this.service.register(request.payload);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthController;
