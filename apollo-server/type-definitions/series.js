const gql = require('graphql-tag');

module.exports = gql`
  type Series {
    id: Int!
    name: String
    volumeCount: Int
  }
  input SeriesInput {
    id: Int
    name: String
    volumeCount: Int
  }
`;
