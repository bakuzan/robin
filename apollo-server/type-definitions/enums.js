const gql = require('graphql-tag');

const { mapArrToGraphqlString } = require('../utils');
const { SeriesType } = require('../constants/enums');

const SeriesTypeGQL = gql`
  enum SeriesType {
    ${mapArrToGraphqlString(SeriesType)}
  }
`;

const VolumeSortOrder = gql`
  enum VolumeSortOrder {
    NUMBER_DESC
    NUMBER_ASC
  }
`;

module.exports = [SeriesTypeGQL, VolumeSortOrder];
