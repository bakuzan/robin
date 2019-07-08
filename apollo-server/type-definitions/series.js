const gql = require('graphql-tag');

module.exports = gql`
  type Series {
    id: Int!
    name: String
    type: SeriesType
    status: SeriesStatus
    volumeCount: Int
    volumes(sort: VolumeSortOrder): [Volume]
    volumeAverage: String
  }
  input SeriesFilter {
    search: String
    type: SeriesType
    statuses: [SeriesStatus]
  }
  input SeriesInput {
    id: Int
    name: String
    type: SeriesType
    status: SeriesStatus
    volumeCount: Int
    volumes: [VolumeInput]
  }
`;
