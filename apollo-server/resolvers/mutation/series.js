const Op = require('sequelize').Op;

const { db, Series, Volume, Retailer } = require('../../connectors');
const separateArrIntoNewAndExisting = require('../../utils/separate-new-and-existing');

module.exports = {
  async seriesCreate(_, { series }) {
    const { volumes, ...args } = series;
    const createdAt = Date.now();
    const newRetailers = volumes
      .map((x) => x.retailer)
      .filter((x, i, arr) => x && arr.indexOf(x) === i);

    return db.transaction(async (transaction) => {
      const newSeries = await Series.create({ ...args });
      let mappedVolumes = volumes;

      if (newRetailers.length) {
        await Retailer.bulkCreate(newRetailers, { transaction });
        const created = await Retailer.findAll({
          where: { createdAt: { [Op.gte]: createdAt } },
          raw: true,
          transaction
        });

        mappedVolumes = volumes.map(({ retailer, ...x }) => {
          if (!retailer) return x;

          const newRetailer = created.find((r) => r.name === retailer.name);
          return { ...x, retailerId: newRetailer.id };
        });
      }

      await Volume.bulkCreate(mappedVolumes, { transaction });
      const newVolumes = await Volume.findAll({
        where: { createdAt: { [Op.gte]: createdAt } },
        transaction
      });

      await newSeries.setVolumes(newVolumes, { transaction });

      return await newSeries;
    });
  },
  seriesUpdate(_, { series }) {
    const { id, volumes, ...args } = series;
    const { existingItemIds } = separateArrIntoNewAndExisting(volumes);

    return db.transaction(async (transaction) => {
      await Series.update({ ...args }, { where: { id }, transaction });
      const instance = await Series.findByPk(id, { transaction });
      await instance.setVolumes(existingItemIds, { transaction });
      return instance;
    });
  }
};
