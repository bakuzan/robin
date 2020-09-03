const { DataTypes } = require('sequelize');

const {
  SeriesType,
  SeriesStatus,
  SeriesStatuses
} = require('../constants/enums');

module.exports = (db) => {
  return db.define('series', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: {
      type: DataTypes.ENUM,
      values: [...SeriesType]
    },
    volumeCount: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: [...SeriesStatus],
      defaultValue: SeriesStatuses.Ongoing
    }
  });
};
