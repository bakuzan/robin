const Op = require('sequelize').Op;
const { db, Series, Volume, Retailer } = require('../../connectors');

const RBNDate = require('../../utils/date');
const validateFromDate = require('../../utils/validate-from-date');
const {
  mapDataToProportion,
  mapDataToAggregates,
  mapDataToGroupCounts
} = require('../../utils/dashboard');

module.exports = {
  async dashboard(_, { filters }) {
    const fromDate = RBNDate.startOfDay(filters.fromDate);
    validateFromDate(fromDate);

    const where = {
      boughtDate: {
        [Op.gte]: fromDate,
        [Op.lte]: RBNDate.endOfDay(filters.toDate)
      }
    };

    const [comicStat, mangaStat] = await Volume.findAll({
      where,
      raw: true,
      group: 'series.type',
      attributes: {
        include: [
          [db.fn('AVG', db.col('paid')), 'average'],
          [db.fn('MIN', db.col('paid')), 'minimum'],
          [db.fn('MAX', db.col('paid')), 'maximum'],
          [db.fn('SUM', db.col('paid')), 'total'],
          [db.fn('COUNT', db.col('paid')), 'count']
        ]
      },
      include: [Series]
    });

    const graphData = await Volume.findAll({
      where,
      raw: true,
      group: ['series.type', db.fn('strftime', '%Y-%m', db.col('boughtDate'))],
      attributes: [
        [db.col('series.type'), 'type'],
        [db.fn('strftime', '%Y-%m', db.col('volume.boughtDate')), 'group'],
        [db.fn('COUNT', db.col('volume.id')), 'count'],
        [db.fn('SUM', db.col('volume.paid')), 'expenditure']
      ],
      include: [Series]
    });

    const retailerData = await Volume.findAll({
      where,
      raw: true,
      group: ['series.type', 'retailer.id'],
      attributes: [
        [db.col('series.type'), 'type'],
        [db.col('retailer.name'), 'name'],
        [db.fn('COUNT', db.col('volume.id')), 'value']
      ],
      include: [Series, Retailer]
    });

    return {
      aggregates: [
        mapDataToAggregates(comicStat),
        mapDataToAggregates(mangaStat)
      ],
      byMonthCounts: mapDataToGroupCounts(filters, graphData),
      proportions: [mapDataToProportion('Retailers', retailerData)]
    };
  }
};
