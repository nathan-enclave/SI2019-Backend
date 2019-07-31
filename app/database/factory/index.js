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

    data.push({
      username: 'admin2',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      engineerId: 2,
      roleId: 2
    });
    data.push({
      username: 'admin3',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      engineerId: 3,
      roleId: 3
    });
    for (let index = 0; index < num - 3; index += 1) {
      data.push(samples.createManager(3, index + 10));
    }
    return data;
  }

  static engineer(num) {
    const data = [];
    data.push({
      firstName: 'David',
      lastName: 'Brown',
      englishName: 'David',
      phoneNumber: '0127456789',
      address: '453 Hoang Dieu',
      email: 'David.en123@gmail.com',
      expYear: faker.random.number({
        min: 0,
        max: 10
      }),
      dayOffRemain: faker.random.number({
        min: 5,
        max: 12
      }),
      dateIn: '2011-06-17',
      birthday: '1992-12-21',
      gender: 'Female',
      salary: 0,
      skype: 'eureka.m1060@enclave.vn',
      status: 1
    });

    data.push({
      firstName: 'Jane',
      lastName: 'Doe',
      englishName: 'Jane',
      phoneNumber: '0952075469',
      address: '459 Hoang Dieu',
      email: 'Jane.Doe@gmail.com',
      expYear: faker.random.number({
        min: 0,
        max: 10
      }),
      dayOffRemain: faker.random.number({
        min: 5,
        max: 12
      }),
      dateIn: '2009-06-17',
      birthday: '1986-02-11',
      gender: 'Male',
      salary: 0,
      skype: 'eureka.m1160@enclave.vn',
      status: 1
    });
    data.push({
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      englishName: 'Mark',
      phoneNumber: '0934078869',
      address: '460 Hoang Dieu',
      email: 'Mark.Zuckerberg@gmail.com',
      expYear: faker.random.number({
        min: 0,
        max: 10
      }),
      dayOffRemain: faker.random.number({
        min: 5,
        max: 12
      }),
      dateIn: '2009-06-17',
      birthday: '1986-05-11',
      gender: 'Female',
      salary: 0,
      skype: 'eureka.m1061@enclave.vn',
      status: 1
    });

    for (let index = 0; index < num - 3; index += 1) {
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
