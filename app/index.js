/* eslint no-console: 0 */

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const hapiAuthJWT = require('hapi-auth-jwt2');
const routes = require('./main/routes');
const CONSTANTS = require('./constants/index');

require('dotenv').config();

const server = new Hapi.Server({
  // host: process.env.APP_HOST,
  host: process.env.HOST,
  // port: process.env.APP_PORT,
  port: process.env.PORT,
  routes: {
    cors: true,
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          throw err;
        } else {
          console.error(err);
          throw err;
        }
      }
    }
  }
});

const validateUser = decoded => {
  if (decoded && decoded.id) {
    return { isValid: true };
  }

  return { isValid: false };
};

const apiVersionOptions = {
  basePath: '/api',
  validVersions: [1, 2],
  defaultVersion: 1,
  vendorName: 'api'
};

const swaggerOptions = {
  pathPrefixSize: 3,
  host: process.env.HOST,
  basePath: apiVersionOptions.basePath,
  info: {
    title: ' Enclave Engineering Management RESTful API Documentation',
    description:
      'This is API documentation.' +
      '\n' +
      '###Basic api query use for getAll resources. Only support normal query if need complex or advanced use cases(fulltextsearch, geolocation...) contact server developers to support more.' +
      '\n' +
      '###$ Paginate with limit and offset. \nEx: ?limit=5&offset=5\n' +
      '###$ Order by fields. \n Ex: ?order=yearExp asc,dayOffRemain desc' +
      '\n' +
      '###$ Select field on query. \nEx: ?fields=["firstName","lastName"]' +
      '\n' +
      '###$ Filter equal \nEx: ?filter={"firstName": "Doe"}' +
      '\n' +
      '###$ Filter less than \nEx: ?filter={"yearExp": {"$lt": 4}}' +
      '\n' +
      '###$ Filter greater than \nEx: ?filter={"yearExp": {"$gt": 2}}' +
      '\n' +
      '###$ Filter less than and equal \nEx: ?filter={"yearExp": {"$lte": 4}}' +
      '\n' +
      '###$ Filter greater than equal \nEx: ?filter={"yearExp": {"$gte": 2}}' +
      '\n' +
      '###$ Filter field in many choice \nEx: ?filter={"firstName": {"$in": ["John", "MMMM"]}}' +
      '\n' +
      '###$ Filter field by text \nEx: ?filter={"englishName": {"$like": "%en%"}}' +
      '\n' +
      '###$ Filter field by text and no distinction between upper and lowercase letters \nEx: ?filter={"englishName": {"$likeLower": "%Henry%"}}' +
      '\n' +
      '###$ See more: https://github.com/hoang3553/objection-filter#15c2a512509401dbf3477b11454ac02a30c095c8'
  },
  deReference: false
};

process.on('uncaughtException', err => {
  console.log(err, 'Uncaught exception');
  process.exit(1);
});

async function start() {
  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      hapiAuthJWT
    ]);
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET || CONSTANTS.JWT_SECRET,
      validate: validateUser,
      verifyOptions: { ignoreExpiration: true }
    });

    server.auth.default('jwt');
    server.route(routes);
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server running at: ', server.info.uri);
}

start();

module.exports = server;
