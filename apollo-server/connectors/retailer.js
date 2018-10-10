module.exports = (db, Types) => {
  return db.define('retailer', {
    name: { type: Types.STRING, allowNull: false, unique: true }
  });
};
