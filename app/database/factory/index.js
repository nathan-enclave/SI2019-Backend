const bcrypt = require('bcrypt');
// const Models = require('../models');
const samples = require('./samples');
const { SALT_ROUNDS } = require('../../constants');
const json = require('./data.json');
const faker = require('faker');

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
      skype: 'intern.m0060@enclave.vn',
      status: 1
    });
    for (let index = 0; index < num - 1; index += 1) {
      data.push(samples.createEngineer());
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

  static project(num) {
    const data = [];
    for (let index = 0; index < num; index += 1) {
      data.push(samples.createProject(index + 1));
    }
    return data;
  }

  static team(num) {
    // const projectNum = (await Models.Project.query().count())[0].count;

    const data = [];
    for (let index = 0; index < num; index += 1) {
      data.push(samples.createTeam(num + 1));
    }
    return data;
  }
}

module.exports = Factory;
