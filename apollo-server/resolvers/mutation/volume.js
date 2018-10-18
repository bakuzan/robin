const { db, Volume, Retailer } = require('../../connectors');

module.exports = {
  async volumeCreate(_, { volume }) {
    const { id, retailer, ...args } = volume;
    return db.transaction(async (transaction) => {
      let retailerId = args.retailerId || null;
      if (retailer) {
        const created = await Retailer.create(retailer, { transaction });
        retailerId = created.id;
      }

      return await Volume.create({ ...args, retailerId }, { transaction });
    });
  },
  volumeUpdate(_, { volume }) {
    const { id, retailer, ...args } = volume;
    return db.transaction(async (transaction) => {
      let retailerId = args.retailerId || null;
      if (retailer) {
        const created = await Retailer.create(retailer, { transaction });
        retailerId = created.id;
      }

      await Volume.update(
        { ...args, retailerId },
        { where: { id }, transaction }
      );
      return Volume.findById(id, { transaction });
    });
  }
};
