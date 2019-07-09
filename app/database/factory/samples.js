const faker = require('faker/locale/en');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { SALT_ROUNDS } = require('../../constants');
const data = require('./data.json');

exports.createManager = (roleId, engineerId) => ({
  username: faker.internet.userName(),
  password: bcrypt.hashSync('123456', SALT_ROUNDS),
  engineerId,
  roleId
});

exports.createEngineer = () => {
  const firstName = faker.name.firstName();
  return {
    firstName,
    lastName: faker.name.lastName(),
    englishName: firstName,
    phoneNumber: faker.phone.phoneNumberFormat(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    expYear: faker.random.number({
      min: 0,
      max: 10
    }),
    dayOffRemain: faker.random.number({
      min: 5,
      max: 12
    }),
    skype: faker.internet.email(),
    status: 1
    // skype: 'eureka.m'+ faker.random.
  };
};

exports.createProject = number => ({
  name: `Project ${number}`,
  technology:
    data.lang[
      faker.random.number({
        min: 0,
        max: data.lang.length - 1
      })
    ],
  description: `This is the description of project ${number}`,
  start: faker.date.past((1 / 365) * 10),
  end: faker.date.future((1 / 365) * 20),
  status: _.sample(['progress', 'pending', 'done'])
});

exports.createTeam = projectId => ({
  name: `Team ${projectId}`,
  projectId
});

exports.createEngineerTeam = (engineerId, teamId, role = 'member') => ({
  engineerId,
  teamId,
  role
});

exports.createSkill = name => ({
  name
});

exports.createEngineerSkill = (engineerId, skillId) => ({
  engineerId,
  skillId
});
