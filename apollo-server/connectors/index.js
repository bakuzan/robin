const Sequelize = require('sequelize');

const Constants = require('../constants/index');
const Utils = require('../utils');
const migrate = require('../config');
const TestData = require('../config/test-data');

const db = new Sequelize(Constants.appName, null, null, {
  dialect: 'sqlite',
  storage: `${process.env.DB_STORAGE_PATH}${Constants.appName}.${
    process.env.NODE_ENV
  }.sqlite`,
  operatorsAliases: false
});

const SeriesModel = db.import('./series');

// Sync and Migrate db
// Only add test data if sync is forced
// Populate rankings
const FORCE_DB_REBUILD = Utils.castStringToBool(process.env.FORCE_DB_REBUILD);
const SEED_DB = Utils.castStringToBool(process.env.SEED_DB);

db.sync({ force: FORCE_DB_REBUILD })
  .then(() => migrate(db))
  .then(async () => {
    if (FORCE_DB_REBUILD && SEED_DB) {
      const { series } = db.models;
      await series.bulkCreate(TestData.series);
    }
  });

const Series = db.models.series;

module.exports = {
  db,
  Series
};
