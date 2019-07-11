const bcrypt = require('bcrypt');
const faker = require('faker');
// const _ = require('lodash');
const Models = require('../models');
const samples = require('./samples');
const { SALT_ROUNDS } = require('../../constants');
const json = require('./data.json');

class Factory {
  static manager(num) {
    const data = [];
    data.push({
      username: 'admin',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      engineerId: 1,
      roleId: 1
    });
    for (let index = 0; index < num - 1; index += 1) {
      data.push(samples.createManager(2, index + 10));
    }
    return data;
  }

  static engineer(num) {
    const data = [];
    data.push({
      firstName: 'Minh Hoang',
      lastName: 'Ho',
      englishName: 'Henry',
      phoneNumber: '0847079429',
      address: '453 Hoang Dieu',
      email: 'minhhoangho99@gmail.com',
      expYear: faker.random.number({
        min: 0,
        max: 10
      }),
      dayOffRemain: faker.random.number({
        min: 5,
        max: 12
      }),
      dateIn: '2019-06-17',
      birthday: '1999-03-01',
      salary: 0,
      skype: 'intern.m0060@enclave.vn',
      status: 1
    });
    for (let index = 0; index < num - 1; index += 1) {
      data.push(samples.createEngineer(index + 12));
    }
    return data;
  }

  static skill() {
    const data = [];

    for (let index = 0; index < json.lang.length; index += 1) {
      data.push({
        name: json.lang[index]
      });
    }

    return data;
  }

  static async project(num) {
    const categoryCount = (await Models.Category.query().count())[0].count;
    const data = [];
    for (let index = 0; index < num; index += 1) {
      data.push(
        samples.createProject(
          index + 1,
          faker.random.number({
            min: 1,
            max: categoryCount
          })
        )
      );
    }
    return data;
  }

  static async team() {
    const project = await Models.Project.query()
      .whereNot('status', 'pending')
      .select('id');
    const listId = project.map(e => e.id);
    const data = [];
    for (let index = 0; index < listId.length; index += 1) {
      data.push(samples.createTeam(listId[index]));
    }
    return data;
  }

  static cashFlow() {
    const data = [];
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 12; j += 1) {
        data.push(samples.createCashFlow(j + 1, 2018 + i));
      }
    }
    return data;
  }

  static categories() {
    const data = [
      {
        name: 'Finance',
        description: 'For financial purpose'
      },
      {
        name: 'Healthcare',
        description: 'Support Medical product'
      },
      {
        name: 'Education',
        description: 'Educational properties'
      },
      {
        name: 'Tourism',
        description: 'Tourism product'
      },
      {
        name: 'Human management',
        description: 'For human resource'
      },
      {
        name: 'Business',
        description: 'Business project'
      }
    ];
    return data;
  }
}

module.exports = Factory;
