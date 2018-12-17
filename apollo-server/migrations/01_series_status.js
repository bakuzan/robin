const { SeriesStatus, SeriesStatuses } = require('../constants/enums');

const TABLE = 'series';
const COLUMN = 'status';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(TABLE, COLUMN, {
      type: Sequelize.ENUM,
      values: [...SeriesStatus],
      defaultValue: SeriesStatuses.Ongoing
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(TABLE, COLUMN);
  }
};
