const { displayAs2dp } = require('../index');

function displayAs2dpWithFallback(v) {
  const v2 = displayAs2dp(v);
  return v2 ? `£ ${v2}` : 'N/A';
}

module.exports = function mapDataToAggregates(label, derviedStats = {}) {
  return {
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
  };
};
