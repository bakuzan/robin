const gql = require('graphql-tag');

const Query = gql`
  type Query {
    series(filters: SeriesFilter): [Series]
    seriesById(id: Int!): Series

    volumes(filters: VolumeFilter): [Volume]

    retailers: [Retailer]

    dashboard(filters: DashboardFilters): Dashboard
  }
`;

const Mutation = gql`
  type Mutation {
    seriesCreate(series: SeriesInput): Series
    seriesUpdate(series: SeriesInput): Series

    volumeCreate(volume: VolumeInput): Volume
    volumeUpdate(volume: VolumeInput): Volume

    import(volumes: [ImportInput]): ImportResponse
  }
`;

module.exports = [Query, Mutation];
