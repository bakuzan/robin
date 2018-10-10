const { SeriesType } = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('series', {
    name: { type: Types.STRING, allowNull: false, unique: true },
    type: {
      type: Types.ENUM,
      values: [...SeriesType]
    },
    volumeCount: {
      type: Types.INTEGER,
      defaultValue: null,
      allowNull: true
    }
  });
};
