const Op = require('sequelize').Op;

const { db, Series, Volume, Retailer } = require('../../connectors');
const separateArrIntoNewAndExisting = require('../../utils/separate-new-and-existing');

module.exports = {
  async seriesCreate(_, { series }) {
    const { volumes, ...args } = series;
    return await Series.create(
      { ...args, volumes },
      { include: [{ model: Volume, include: [{ model: Retailer }] }] }
    );
  },
  seriesUpdate(_, { series }) {
    const { id, volumes, ...args } = series;
    const createdAt = Date.now();
    const { newItems, existingItemIds } = separateArrIntoNewAndExisting(
      volumes
    );

    return db.transaction((transaction) =>
      Series.update({ ...args }, { where: { id }, transaction })
        .then(() => Series.findById(id, { transaction }))
        .then(async (instance) => {
          await instance.setVolumes(existingItemIds, { transaction });
          if (!newItems.length) {
            return instance;
          }

          return Volume.bulkCreate(newItems, {
            transaction,
            include: [Retailer]
          })
            .then(() =>
              Volume.findAll({
                where: { createdAt: { [Op.gte]: createdAt } },
                transaction
              })
            )
            .then((createdVolumes) =>
              instance.addVolumes(createdVolumes, { transaction })
            )
            .then(() => instance);
        })
    );
  }
};
