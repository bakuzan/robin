const query = require('./query');
const enums = require('./enums');
const series = require('./series');
const volume = require('./volume');
const retailer = require('./retailer');

module.exports = [...query, ...enums, series, volume, retailer];
