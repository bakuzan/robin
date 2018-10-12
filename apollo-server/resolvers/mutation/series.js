const Op = require('sequelize').Op;

const { db, Series, Volume } = require('../../connectors');
const separateArrIntoNewAndExisting = require('../../utils/separate-new-and-existing');

module.exports = {
  async seriesCreate(_, { series }) {
    const { volumes, ...args } = series;
    return await Series.create(
      { ...args, volumes },
      { include: [Series.Volume] }
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

          return Volume.bulkCreate(newItems, { transaction })
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
