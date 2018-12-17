const enumArrayToObject = require('../utils').enumArrayToObject;

const SeriesType = Object.freeze(['Manga', 'Comic']);

const SeriesStatus = Object.freeze(['Ongoing', 'Complete', 'Dropped']);

module.exports = {
  SeriesType,
  SeriesTypes: enumArrayToObject(SeriesType),
  SeriesStatus,
  SeriesStatuses: enumArrayToObject(SeriesStatus)
};
