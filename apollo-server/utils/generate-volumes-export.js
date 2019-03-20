const { formatDateInput } = require('./date');
const { displayAs2dp } = require('./index');

const headers = [
  'Series',
  'Volume',
  'Retailer',
  'Bought Date',
  'RRP (£)',
  'Paid (£)',
  'Used Discount?'
];

const exportKeys = [
  (d) => d['series.name'],
  (d) => d.number,
  (d) => d['retailer.name'],
  (d) => formatDateInput(d.boughtDate),
  (d) => displayAs2dp(d.rrp),
  (d) => displayAs2dp(d.paid),
  (d) => !!d.usedDiscountCode
];

module.exports = function generateVolumesExport(volumes) {
  const processedVolumes = volumes.map((v) =>
    exportKeys.reduce((p, kFn) => `${p}${kFn(v)},`, '')
  );
  return [headers.join(','), ...processedVolumes].join('\r\n');
};
