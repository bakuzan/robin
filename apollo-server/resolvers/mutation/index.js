const series = require('./series');
const volume = require('./volume');
const importer = require('./import');

module.exports = {
  ...series,
  ...volume,
  ...importer
};
