const Op = require('sequelize').Op;

const { Series } = require('../../connectors');
const { SeriesTypes } = require('../../constants/enums');

module.exports = {
  series(_, { filters }) {
    const { search = '', type = SeriesTypes.Manga, statuses = [] } = filters;

    return Series.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`
        },
        type: {
          [Op.eq]: type
        },
        status: { [Op.in]: statuses }
      },
      order: [['name', 'ASC']]
    });
  },
  seriesById(_, args) {
    const { id } = args;
    return Series.findById(id);
  }
};
