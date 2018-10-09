module.exports = (db, Types) => {
  return db.define('volume', {
    number: {
      type: Types.INTEGER
    },
    releaseDate: {
      types: Types.DATE,
      allowNull: false
    },
    boughtDate: {
      types: Types.DATE,
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
