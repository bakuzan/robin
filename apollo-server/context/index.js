const Op = require('sequelize').Op;

const { db, Series, Volume, Retailer } = require('../connectors');
const RBNDate = require('../utils/date');
const validateFromDate = require('../utils/validate-from-date');

async function getVolumesForDateRange(filters, options = {}) {
  const fromDate = RBNDate.startOfDay(filters.fromDate);
  const toDate = RBNDate.endOfDay(filters.toDate);

  validateFromDate(fromDate);

  return await Volume.findAll({
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
    include: [Series, Retailer],
    ...options
  });
}

module.exports = {
  getVolumesForDateRange
};
