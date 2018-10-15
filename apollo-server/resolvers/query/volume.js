const Op = require('sequelize').Op;

const { db, Series, Volume } = require('../../connectors');
const RBNDate = require('../../utils/date');

module.exports = {
  volumes(_, { filters }) {
    const fromDate = RBNDate.startOfDay(filters.fromDate);
    const toDate = RBNDate.endOfDay(filters.toDate);

    return Volume.findAll({
      where: {
        type: db.where(db.col('series.type'), {
          [Op.eq]: filters.type
        }),
        boughtDate: {
          [Op.lte]: toDate,
          [Op.gte]: fromDate
        }
      },
      order: [['boughtDate', 'DESC']],
      include: [Series, Retailer]
    });
  }
};
