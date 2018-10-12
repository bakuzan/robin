const { Volume } = require('../../connectors');

module.exports = {
  async volumeCreate(_, { volume }) {
    return await Volume.create({ ...volume });
  },
  volumeUpdate(_, { volume }) {
    const { id, ...args } = volume;
    return Volume.update({ ...args }, { where: { id } }).then(() =>
      Volume.findById(id)
    );
  }
};
