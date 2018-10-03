const gql = require('graphql-tag');

const Query = gql`
  type Query {
    series(filters: SeriesFilter): [Series]
    seriesById(id: Int!): Series
  }
`;

const Mutation = gql`
  type Mutation {
    seriesCreate(series: SeriesInput): Series
    seriesUpdate(series: SeriesInput): Series
  }
`;

module.exports = [Query, Mutation];
