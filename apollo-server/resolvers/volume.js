const RBNDate = require('../utils/date');
const { roundTo2, displayAs2dp } = require('../utils');

module.exports = {
  series(volume) {
    if (volume.series) return volume.series;

    return volume.getSeries();
  },
  retailer(volume) {
    if (volume.retailer) return volume.retailer;

    return volume.getRetailer();
  },
  releaseDate(volume) {
    return RBNDate.formatDateInput(volume.releaseDate);
  },
  boughtDate(volume) {
    return RBNDate.formatDateInput(volume.boughtDate);
  },
  percentagePaid(volume) {
    return displayAs2dp(roundTo2((volume.paid / volume.rrp) * 100));
  }
};
