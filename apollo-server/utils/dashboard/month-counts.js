const { SeriesTypes } = require('../../constants/enums');
const RBNDate = require('../date');
const { capitalise } = require('../index');

function mapSeriesCounts(names, key, items = []) {
  return names.map((name) => {
    const item = items.find((g) => g.group === name);
    return {
      name,
      value: item ? item[key] || 0 : 0
    };
  });
}

function mapGroupToName(datesInRange) {
  return datesInRange.map((d) => d.slice(0, 7));
}

const dataKeys = ['count', 'expenditure'];
module.exports = function mapDataToGroupCounts(filters, gd) {
  const datesInRange = RBNDate.dateRange(filters.fromDate, filters.toDate);
  const names = mapGroupToName(datesInRange);
  const mangaItems = gd.filter((x) => x.type === SeriesTypes.Manga);
  const comicItems = gd.filter((x) => x.type === SeriesTypes.Comic);

  return dataKeys.reduce(
    (p, k) => [
      ...p,
      {
        label: capitalise(k),
        name: SeriesTypes.Comic,
        series: mapSeriesCounts(names, k, comicItems)
      },
      {
        label: capitalise(k),
        name: SeriesTypes.Manga,
        series: mapSeriesCounts(names, k, mangaItems)
      }
    ],
    []
  );
};
