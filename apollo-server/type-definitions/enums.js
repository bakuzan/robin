const gql = require('graphql-tag');

const { mapArrToGraphqlString } = require('../utils');
const { SeriesType, SeriesStatus } = require('../constants/enums');

const SeriesTypeGQL = gql`
  enum SeriesType {
    ${mapArrToGraphqlString(SeriesType)}
  }
`;

const SeriesStatusGQL = gql`
  enum SeriesStatus {
    ${mapArrToGraphqlString(SeriesStatus)}
  }
`;

const VolumeSortOrder = gql`
  enum VolumeSortOrder {
    NUMBER_DESC
    NUMBER_ASC
  }
`;

module.exports = [SeriesTypeGQL, SeriesStatusGQL, VolumeSortOrder];
