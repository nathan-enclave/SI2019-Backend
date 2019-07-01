const jsonwebtoken = require('jsonwebtoken');
const _ = require('lodash');
const CONSTANTS = require('../constants/index');

class Jwt {
  constructor() {
    this.secret = process.env.JWT_SECRET || CONSTANTS.JWT_SECRET;
    this.ttl = 7 * 24 * 60 * 60 * 1000;
  }

  issue(payload) {
    return jsonwebtoken.sign(
      _.assign(payload, {
        ttl: this.ttl
      }),
      this.secret
    );
  }
}

module.exports = new Jwt();
