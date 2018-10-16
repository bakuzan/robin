module.exports = (db, Types) => {
  return db.define('volume', {
    number: {
      type: Types.INTEGER,
      allowNull: false
    },
    releaseDate: {
      type: Types.DATE,
      allowNull: true
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
      allowNull: true,
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
