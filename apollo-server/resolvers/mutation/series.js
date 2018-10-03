const { Series } = require('../../connectors');

module.exports = {
  async seriesCreate(_, { series }) {
    const { ...args } = series;
    return await Series.create({ ...args });
  },
  seriesUpdate(_, { series }) {
    const { id, ...args } = series;
    return Series.update({ ...args }, { where: { id } }).then(() =>
      Series.findById(id)
    );
  }
};
