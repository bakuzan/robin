const RBNDate = require('../utils/date');

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
  }
};
