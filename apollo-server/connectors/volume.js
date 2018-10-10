module.exports = (db, Types) => {
  return db.define('volume', {
    number: {
      type: Types.INTEGER,
      unique: true
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
