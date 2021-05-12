const { displayAs2dp } = require('../index');
const { SeriesTypes } = require('../../constants/enums');

function displayAs2dpWithFallback(v) {
  const v2 = displayAs2dp(v);
  return v2 ? `£ ${v2}` : 'N/A';
}

const mappedValues = (label, derviedStats = {}) => ({
  label,
  statistics: [
    {
      label: 'Average',
      value: displayAs2dpWithFallback(derviedStats.average)
    },
    {
      label: 'Minimum',
      value: displayAs2dpWithFallback(derviedStats.minimum)
    },
    {
      label: 'Maximum',
      value: displayAs2dpWithFallback(derviedStats.maximum)
    },
    {
      label: 'Total',
      value: displayAs2dpWithFallback(derviedStats.total)
    },
    {
      label: 'Count',
      value: derviedStats.count || 0
    }
  ]
});

module.exports = function mapDataToAggregates(data = []) {
  return [
    mappedValues(
      SeriesTypes.Comic,
      data.find((x) => x.type === SeriesTypes.Comic)
    ),
    mappedValues(
      SeriesTypes.Manga,
      data.find((x) => x.type === SeriesTypes.Manga)
    )
  ];
};
