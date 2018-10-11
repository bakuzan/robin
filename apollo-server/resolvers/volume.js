const RBNDate = require('../utils/date');

module.exports = {
  retailer(volume) {
    return volume.getRetailer();
  },
  releaseDate(volume) {
    return RBNDate.formatDateInput(volume.releaseDate);
  },
  boughtDate(volume) {
    return RBNDate.formatDateInput(volume.boughtDate);
  }
};
