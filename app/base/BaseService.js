const Boom = require('boom');

class BaseService {
  constructor(model) {
    this.model = model;
    this.modelName = model.name;
  }

  async getMany(query) {
    let builder = this.model.queryBuilder(query);
    if (this.getSearchQuery && query.q) {
      builder = this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async count() {
    return this.model
      .query()
      .count('id as count')
      .first();
  }

  async getOne(id) {
    const result = await this.model.query().findById(id);
    if (!result) {
      throw Boom.notFound(`${this.modelName} is not found`);
    }
    return result;
  }

  async createOne(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*');
  }

  async updateOne(id, payload) {
    try {
      const result = await this.model.query().patchAndFetchById(id, payload);
      if (!result) {
        throw Boom.notFound(`${this.modelName} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    await this.model.query().deleteById(id);
    return { success: true };
  }
}

module.exports = BaseService;
