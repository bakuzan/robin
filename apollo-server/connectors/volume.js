module.exports = (db, Types) => {
  return db.define('volume', {
    number: {
      type: Types.INTEGER
    },
    releaseDate: {
      type: Types.DATE,
      allowNull: false
    },
    boughtDate: {
      type: Types.DATE,
      allowNull: true
    },
    rrp: {
      type: Types.FLOAT
    },
    paid: {
      type: Types.FLOAT
    }
  });
};
