const Op = require('sequelize').Op;

const { db, Series, Volume } = require('../../connectors');

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
    const newVolumes = volumes.filter((x) => !x.id);
    const existingVolumes = volumes.filter((x) => x.id);

    return db.transaction((transaction) =>
      Series.update({ ...args }, { where: { id }, transaction })
        .then(() => Series.findById(id, { transaction }))
        .then(async (instance) => {
          await instance.setVolumes(existingVolumes, { transaction });
          if (!newVolumes.length) {
            return instance;
          }

          return Volume.bulkCreate(newVolumes, { transaction })
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
