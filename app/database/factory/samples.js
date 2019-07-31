const faker = require('faker/locale/en');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const moment = require('moment');
const { SALT_ROUNDS } = require('../../constants');
const data = require('./data.json');

exports.createManager = (roleId, engineerId) => ({
  username: faker.internet.userName(),
  password: bcrypt.hashSync('123456', SALT_ROUNDS),
  engineerId,
  roleId
});

exports.createEngineer = code => {
  const firstName = faker.name.firstName();

  if (code < 10) {
    code = `00${code.toString()}`;
  } else if (code > 10 && code < 100) {
    code = `0${code.toString()}`;
  }
  const dateIn = faker.date.past(10, new Date());
  const expYear = moment().diff(dateIn, 'year', false);
  return {
    firstName,
    lastName: faker.name.lastName(),
    englishName: firstName,
    phoneNumber: faker.phone.phoneNumber('0##########'),
    birthday: faker.date.past(30, '1999-01-01'),
    gender: _.sample(['Male', 'Female', 'Other']),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    expYear,
    avatar: _.sample(data.avatar),
    salary: _.sample([
      10000000,
      8000000,
      12000000,
      11000000,
      9000000,
      15000000,
      13000000,
      14000000,
      17000000
    ]),
    dayOffRemain: faker.random.number({
      min: 5,
      max: 12
    }),
    overTime: faker.random.number({
      min: 0,
      max: 9
    }),
    status: faker.random.number({
      min: 0,
      max: 3
    }),
    skype: `eureka.m0${code.toString()}@enclave.vn`,
    dateIn
  };
};

exports.createProject = (name, description, categoryId) => {
  const randomStartDate = faker.date.between('2018-01-01', '2019-12-31');
  const lengthOfProject = _.sample([60, 90, 150, 270, 210, 330, 180, 240, 120]);
  const end = moment(randomStartDate)
    .clone()
    .add(lengthOfProject, 'days');
  moment().format();
  let status;
  if (moment(end).isBefore(moment().format(), 'day')) {
    status = 'done';
  } else if (moment(randomStartDate).isBefore(moment().format(), 'day')) {
    status = 'inProgress';
  } else {
    status = 'pending';
  }
  const earning = _.sample([
    600000000,
    200000000,
    310000000,
    42000000,
    70000000,
    152000000,
    190000000,
    140000000,
    210000000,
    49000000,
    90000000,
    29000000,
    69000000,
    210000000,
    96000000,
    69000000,
    100000000,
    290000000
  ]);
  const earningPerMonth = earning / (lengthOfProject / 30);
  return {
    name,
    categoryId,
    technology:
      data.lang[
        faker.random.number({
          min: 0,
          max: data.lang.length - 1
        })
      ],
    description,
    start: randomStartDate,
    end,
    status,
    earning,
    earningPerMonth
  };
};

exports.createTeam = projectId => ({
  name: `Team ${projectId}`,
  projectId
});

exports.createEngineerTeam = (engineerId, teamId, role = 'member', dateJoin) => ({
  engineerId,
  teamId,
  role,
  dateJoin
});

exports.createSkill = name => ({
  name
});

exports.createEngineerSkill = (engineerId, skillId) => ({
  engineerId,
  skillId,
  expYear: faker.random.number({
    min: 0,
    max: 8
  })
});

exports.createCashFlow = (month, year) => {
  const cashIn = _.sample([
    600000000,
    200000000,
    310000000,
    420000000,
    720000000,
    520000000,
    403000000,
    400000000,
    290000000,
    490000000,
    900000000,
    290000000,
    690000000,
    202000000,
    990000000,
    1990500000,
    1095000000,
    2099000000
  ]);
  const cashOut = _.sample([
    100000000,
    200000000,
    310000000,
    420000000,
    120000000,
    220000000,
    103000000,
    130000000,
    290000000,
    490000000,
    900000000,
    290000000,
    390000000,
    102000000
  ]);
  return {
    month,
    year,
    cashIn,
    cashOut
  };
};
