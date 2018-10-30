const query = require('./query');
const enums = require('./enums');
const series = require('./series');
const volume = require('./volume');
const retailer = require('./retailer');
const dashboard = require('./dashboard');
const importDefs = require('./import');

module.exports = [
  ...query,
  ...enums,
  series,
  volume,
  retailer,
  dashboard,
  importDefs
];
