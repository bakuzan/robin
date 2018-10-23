const series = require('./series');
const volume = require('./volume');
const retailer = require('./retailer');
const dashboard = require('./dashboard');

module.exports = {
  ...series,
  ...volume,
  ...retailer,
  ...dashboard
};
