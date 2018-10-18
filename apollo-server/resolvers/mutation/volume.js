const { Volume, Retailer } = require('../../connectors');

module.exports = {
  async volumeCreate(_, { volume }) {
    return await Volume.create({ ...volume }, { include: [Retailer] });
  },
  volumeUpdate(_, { volume }) {
    const { id, ...args } = volume;
    return Volume.update(
      { ...args },
      { where: { id }, include: [Retailer] }
    ).then(() => Volume.findById(id));
  }
};
