const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../app/constants');

const data = [
  {
    username: 'admin',
    password: bcrypt.hashSync('123456', SALT_ROUNDS),
    engineerId: 1,
    roleId: 1
  },
  {
    username: 'admin2',
    password: bcrypt.hashSync('123456', SALT_ROUNDS),
    engineerId: 2,

    roleId: 2
  },
  {
    username: 'user',
    password: bcrypt.hashSync('123456', SALT_ROUNDS),
    engineerId: 3,
    roleId: 3
  }
];

module.exports = data;
