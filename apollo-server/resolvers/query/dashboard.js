const { db, Series, Volume } = require('../../connectors');

function mapStatsToResponse(derviedStats = {}) {
  return {
    label: derviedStats['series.type'],
    average: derviedStats.average,
    minimum: derviedStats.minimum,
    maximum: derviedStats.maximum
  };
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

    console.log('dashboard!! ', comicStat, mangaStat);
    return {
      aggregates: [mapStatsToResponse(comicStat), mapStatsToResponse(mangaStat)]
    };
  }
};
