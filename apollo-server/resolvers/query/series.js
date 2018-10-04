const Op = require('sequelize').Op;

const { Series } = require('../../connectors');

module.exports = {
  series(_, { filters }) {
    const { search = '', types = [] } = filters;
    return Series.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        },
        type: {
          [Op.in]: types
        }
      },
      order: [['name', 'ASC']]
    });
  },
  seriesById(_, args) {
    const { id } = args;
    return Series.findById(id);
  }
};
