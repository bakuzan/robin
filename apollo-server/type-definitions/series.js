const gql = require('graphql-tag');

module.exports = gql`
  type Series {
    id: Int!
    name: String
    type: SeriesType
    volumeCount: Int
  }
  input SeriesFilter {
    search: String
    types: [SeriesType]
  }
  input SeriesInput {
    id: Int
    name: String
    type: SeriesType
    volumeCount: Int
  }
`;
