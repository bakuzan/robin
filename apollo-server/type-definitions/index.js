const query = require('./query');
const enums = require('./enums');
const series = require('./series');
const retailer = require('./retailer');

module.exports = [...query, ...enums, series, retailer];
