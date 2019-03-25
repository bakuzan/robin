const { SeriesTypes } = require('../../constants/enums');

function byValueDescending(a, b) {
  return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
}

module.exports = function mapDataToProportion(label, data) {
  const mangaItems = data
    .filter((x) => x.type === SeriesTypes.Manga)
    .sort(byValueDescending);
  const comicItems = data
    .filter((x) => x.type === SeriesTypes.Comic)
    .sort(byValueDescending);
  return {
    label,
    data: [
      {
        name: SeriesTypes.Comic,
        series: comicItems
      },
      {
        name: SeriesTypes.Manga,
        series: mangaItems
      }
    ]
  };
};
