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

  check(request) {
    try {
      const { email } = request.params;
      return this.service.check(email);
    } catch (err) {
      throw err;
    }
  }

  sendcode(request) {
    try {
      const { email } = request.params;
      return this.service.sendcode(email);
    } catch (err) {
      throw err;
    }
  }

  reset(request) {
    try {
      const { id } = request.params;

      return this.service.reset(id, request.payload);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthController;
