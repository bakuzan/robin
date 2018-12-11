const Op = require('sequelize').Op;
const { db, Series, Volume } = require('../../connectors');

const { SeriesTypes } = require('../../constants/enums');
const { displayAs2dp } = require('../../utils');
const RBNDate = require('../../utils/date');

function mapStatsToResponse(derviedStats = {}) {
  return {
    label: derviedStats['series.type'],
    statistics: [
      {
        label: 'Average',
        value: `£ ${displayAs2dp(derviedStats.average)}`
      },
      {
        label: 'Minimum',
        value: `£ ${displayAs2dp(derviedStats.minimum)}`
      },
      {
        label: 'Maximum',
        value: `£ ${displayAs2dp(derviedStats.maximum)}`
      },
      {
        label: 'Total',
        value: derviedStats.total || 0
      }
    ]
  };
}

function mapSeriesCounts(datesInRange, items = []) {
  return datesInRange.map((d) => {
    const name = d.slice(0, 7);
    const item = items.find((g) => g.group === name);
    return {
      name,
      value: item ? item.count : 0
    };
  });
}

function mapGroupCounts(filters, gd) {
  const datesInRange = RBNDate.dateRange(filters.fromDate, filters.toDate);
  const mangaItems = gd.filter((x) => x.type === SeriesTypes.Manga);
  const comicItems = gd.filter((x) => x.type === SeriesTypes.Comic);

  return [
    {
      name: SeriesTypes.Comic,
      series: mapSeriesCounts(datesInRange, comicItems)
    },
    {
      name: SeriesTypes.Manga,
      series: mapSeriesCounts(datesInRange, mangaItems)
    }
  ];
}

module.exports = {
  async dashboard(_, { filters }) {
    const where = {
      boughtDate: {
        [Op.gte]: RBNDate.startOfDay(filters.fromDate),
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
          [db.fn('COUNT', db.col('paid')), 'total']
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
        [db.fn('COUNT', db.col('volume.id')), 'count']
      ],
      include: [Series]
    });

    return {
      aggregates: [
        mapStatsToResponse(comicStat),
        mapStatsToResponse(mangaStat)
      ],
      byMonthCounts: mapGroupCounts(filters, graphData)
    };
  }
};
