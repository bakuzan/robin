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

          const retailer = created.find((r) => r.name === retailer.name);
          return { ...x, retailerId: retailer.id };
        });
      }

      return await Series.create(
        { ...args, volumes: mappedVolumes },
        { include: [Volume] }
      );
    });
  },
  seriesUpdate(_, { series }) {
    const { id, volumes, ...args } = series;
    const { existingItemIds } = separateArrIntoNewAndExisting(volumes);

    return db.transaction(async (transaction) => {
      await Series.update({ ...args }, { where: { id }, transaction });
      const instance = await Series.findById(id, { transaction });
      await instance.setVolumes(existingItemIds, { transaction });
      return instance;
    });
  }
};
