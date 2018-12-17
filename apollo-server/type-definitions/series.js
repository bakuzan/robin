const gql = require('graphql-tag');

module.exports = gql`
  type Series {
    id: Int!
    name: String
    type: SeriesType
    volumeCount: Int
    volumes(sort: VolumeSortOrder): [Volume]
  }
  input SeriesFilter {
    search: String
    type: SeriesType
  }
  input SeriesInput {
    id: Int
    name: String
    type: SeriesType
    volumeCount: Int
    volumes: [VolumeInput]
  }
`;
