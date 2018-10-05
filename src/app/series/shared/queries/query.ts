import gql from 'graphql-tag';

const getSeries = gql`
  query GetSeries($filters: SeriesFilter) {
    series(filters: $filters) {
      id
      name
    }
  }
`;

const getSeriesById = gql`
  query GetSeriesById($id: Int!) {
    seriesById(id: $id) {
      id
      name
      type
      volumeCount
    }
  }
`;

export default {
  getSeries,
  getSeriesById
};
