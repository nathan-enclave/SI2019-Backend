const bcrypt = require('bcrypt');
// const Models = require('../models');
const samples = require('./samples');
const { SALT_ROUNDS } = require('../../constants');
const json = require('./data.json');

class Factory {
  static manager(num) {
    const data = [];
    data.push({
      username: 'admin',
      password: bcrypt.hashSync('123456', SALT_ROUNDS),
      engineerId: 200,
      roleId: 1
    });
    for (let index = 0; index < num - 1; index += 1) {
      data.push(samples.createManager(2));
    }
    return data;
  }

  static engineer(num) {
    const data = [];
    for (let index = 0; index < num; index += 1) {
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
