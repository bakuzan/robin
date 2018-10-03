import gql from 'graphql-tag';

const getSeries = gql`
  query GetSeries($filters: SeriesFilter) {
    series(filters: $filters) {
      id
      name
    }
  }
`;

export default {
  getSeries
};
