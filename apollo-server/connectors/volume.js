const { DataTypes } = require('sequelize');

module.exports = (db) => {
  return db.define('volume', {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    boughtDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rrp: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    paid: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true
      }
    },
    usedDiscountCode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
