/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const glob = require('glob');
const path = require('path');
const _ = require('lodash');

const routes = [];

glob.sync('./**/routers.js').forEach(file => {
  routes.push(require(path.resolve(file)));
});

module.exports = _.flattenDeep(routes);
