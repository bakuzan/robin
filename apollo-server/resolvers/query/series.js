const Op = require('sequelize').Op;

const { Series } = require('../../connectors');

module.exports = {
  series(_, { search = '', sources }) {
    const resolvedArgs = sources
      ? {
          source: {
            [Op.in]: sources
          }
        }
      : {};

    return Series.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        },
        ...resolvedArgs
      },
      order: [['name', 'ASC']]
    });
  },
  seriesById(_, args) {
    const { id } = args;
    return Series.findById(id);
  }
};
