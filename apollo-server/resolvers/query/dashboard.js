const { db, Series, Volume } = require('../../connectors');

const { displayAs2dp } = require('../../utils');

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

function mapGroupCounts(gd) {
  return [];
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
