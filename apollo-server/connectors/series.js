const { SeriesType } = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('series', {
    name: { type: Types.STRING, allowNull: false },
    type: {
      type: Types.ENUM,
      values: [...SeriesType]
    }
  });
};
