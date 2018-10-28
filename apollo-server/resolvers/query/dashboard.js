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
      }
    ]
  };
}

function mapSeriesCounts(items) {
  if (!items || !items.length) return [];

  const dates = items.map((x) => new Date(x.group));
  const toDate = RBNDate.formatDateInput(Math.max.apply(null, dates));
  const fromDate = RBNDate.formatDateInput(Math.min.apply(null, dates));
  const datesInRange = RBNDate.dateRange(fromDate, toDate);

  return datesInRange.map((d) => {
    const name = d.slice(0, 7);
    const item = items.find((g) => g.group === name);
    return {
      name,
      value: item ? item.count : 0
    };
  });
}

function mapGroupCounts(gd) {
  const mangaItems = gd.filter((x) => x.type === SeriesTypes.Manga);
  const comicItems = gd.filter((x) => x.type === SeriesTypes.Comic);

  return [
    {
      name: SeriesTypes.Comic,
      series: mapSeriesCounts(comicItems)
    },
    {
      name: SeriesTypes.Manga,
      series: mapSeriesCounts(mangaItems)
    }
  ];
}

module.exports = {
  async dashboard() {
    const [comicStat, mangaStat] = await Volume.findAll({
      raw: true,
      group: 'series.type',
      attributes: {
        include: [
          [db.fn('AVG', db.col('paid')), 'average'],
          [db.fn('MIN', db.col('paid')), 'minimum'],
          [db.fn('MAX', db.col('paid')), 'maximum']
        ]
      },
      include: [Series]
    });

    const graphData = await Volume.findAll({
      raw: true,
      attributes: [
        [db.col('series.type'), 'type'],
        [db.fn('strftime', '%Y-%m', db.col('volume.boughtDate')), 'group'],
        [db.fn('COUNT', db.col('volume.id')), 'count']
      ],
      group: ['series.type', db.fn('strftime', '%Y-%m', db.col('boughtDate'))],
      include: [Series]
    });

    return {
      aggregates: [
        mapStatsToResponse(comicStat),
        mapStatsToResponse(mangaStat)
      ],
      byMonthCounts: mapGroupCounts(graphData)
    };
  }
};
