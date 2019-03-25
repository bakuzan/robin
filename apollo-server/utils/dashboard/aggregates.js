const { displayAs2dp } = require('../index');

module.exports = function mapDataToAggregates(derviedStats = {}) {
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
        value: `£ ${displayAs2dp(derviedStats.total)}`
      },
      {
        label: 'Count',
        value: derviedStats.count || 0
      }
    ]
  };
};
