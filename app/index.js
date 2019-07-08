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
      'This is API documentation.' 
      
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
