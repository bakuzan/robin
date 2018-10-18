const series = require('./series');
const volume = require('./volume');
const retailer = require('./retailer');

module.exports = {
  ...series,
  ...volume,
  ...retailer
};
