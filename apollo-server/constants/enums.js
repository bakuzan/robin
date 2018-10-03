const enumArrayToObject = require('../utils').enumArrayToObject;

const SeriesType = Object.freeze(['Manga', 'Comic']);

module.exports = {
  SeriesType,
  SeriesTypes: enumArrayToObject(SeriesType)
};
