const Sequelize = require('sequelize');

const Constants = require('../constants/index');
const Utils = require('../utils');
const migrate = require('../config');
const TestData = require('../config/test-data');
const extraSetup = require('./extraSetup');

const db = new Sequelize(Constants.appName, null, null, {
  dialect: 'sqlite',
  storage: `${process.env.DB_STORAGE_PATH}${Constants.appName}.${process.env.NODE_ENV}.sqlite`
});

const modelDefiners = [
  require('./series'),
  require('./volume'),
  require('./retailer')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(db);
}

// Other db setup...
extraSetup(db);

// Sync and Migrate db
// Only add test data if sync is forced
// Populate rankings
const FORCE_DB_REBUILD = Utils.castStringToBool(process.env.FORCE_DB_REBUILD);
const SEED_DB = Utils.castStringToBool(process.env.SEED_DB);

db.sync({ force: FORCE_DB_REBUILD })
  .then(() => migrate(db))
  .then(async () => {
    if (FORCE_DB_REBUILD && SEED_DB) {
      const { series, retailer, volume } = db.models;
      await series.bulkCreate(TestData.series);
      await retailer.bulkCreate(TestData.retailer);
      await volume.bulkCreate(TestData.volume);
    }
  })
  .then(
    async () => await db.models.volume.destroy({ where: { seriesId: null } })
  );

const { series: Series, volume: Volume, retailer: Retailer } = db.models;

module.exports = {
  db,
  Series,
  Volume,
  Retailer
};
