const Constants = require('../constants');
const { formatDateInput } = require('./date');

module.exports = function validateFromDate(fromDate) {
  if (fromDate < Constants.whenRecordsBegan) {
    throw Error(
      `Invalid 'fromDate' of ${formatDateInput(
        fromDate
      )}. Records began ${formatDateInput(Constants.whenRecordsBegan)}`
    );
  }
};
