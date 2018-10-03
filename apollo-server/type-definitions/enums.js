const gql = require('graphql-tag');

const { mapArrToGraphqlString } = require('../utils');
const { SeriesType } = require('../constants/enums');

const SeriesTypeGQL = gql`
  enum SeriesType {
    ${mapArrToGraphqlString(SeriesType)}
  }
`;

module.exports = [SeriesTypeGQL];
