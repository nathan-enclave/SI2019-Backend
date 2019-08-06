const _ = require('lodash');

class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAuthdata(credentials) {
    return _.pick(credentials, [
      'id',
      'scope',
      'engineerId',
      'englishName',
      'firstName',
      'lastName'
    ]);
  }

  async getMany(request) {
    try {
      return await this.service.getMany(request.query);
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  async count() {
    try {
      return await this.service.count();
    } catch (err) {
      throw err;
    }
  }

  async getOne(request) {
    try {
      const { id } = request.params;
      return await this.service.getOne(id);
    } catch (err) {
      throw err;
    }
  }

  async createOne(request) {
    try {
      const { payload, auth } = request;
      const authData = this.getAuthdata(auth.credentials);
      return await this.service.createOne(payload, authData);
    } catch (err) {
      throw err;
    }
  }

  async updateOne(request) {
    try {
      const { params, payload, auth } = request;
      const authData = this.getAuthdata(auth.credentials);
      const { id } = params;
      return await this.service.updateOne(id, payload, authData);
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(request) {
    try {
      const { id } = request.params;
      const { auth } = request;
      const authData = this.getAuthdata(auth.credentials);
      return await this.service.deleteOne(id, authData);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseController;
