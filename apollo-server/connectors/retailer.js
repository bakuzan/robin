const { DataTypes } = require('sequelize');

module.exports = (db) => {
  return db.define('retailer', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  });
};
