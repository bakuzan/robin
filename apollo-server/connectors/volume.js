module.exports = (db, Types) => {
  return db.define('volume', {
    number: {
      type: Types.INTEGER
    },
    releaseDate: {
      type: Types.DATE
    },
    boughtDate: {
      type: Types.DATE,
      allowNull: true
    },
    rrp: {
      type: Types.FLOAT,
      validate: {
        isFloat: true
      }
    },
    paid: {
      type: Types.FLOAT,
      validate: {
        isFloat: true
      }
    },
    usedDiscountCode: {
      type: Types.BOOLEAN,
      defaultValue: false
    }
  });
};
