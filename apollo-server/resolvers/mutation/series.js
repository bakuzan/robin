const { Series, Volume } = require('../../connectors');

module.exports = {
  async seriesCreate(_, { series }) {
    const { ...args } = series;
    return await Series.create({ ...args }, { include: [Volume] });
  },
  seriesUpdate(_, { series }) {
    const { id, volumes, ...args } = series;
    const newVolumes = volumes.filter((x) => !x.id);
    return Series.update(
      { ...args, volumes: newVolumes },
      { where: { id }, include: [Volume] }
    ).then(() => Series.findById(id));
  }
};
