import gql from 'graphql-tag';

import Fragments from './fragment';

const getSeries = gql`
  query GetSeries($filters: SeriesFilter) {
    series(filters: $filters) {
      ...SeriesKeyFields
    }
  }
  ${Fragments.keyFields}
`;

const getSeriesById = gql`
  query GetSeriesById($id: Int!) {
    seriesById(id: $id) {
      ...SeriesViewFields
    }
  }
  ${Fragments.viewFields}
`;

export default {
  getSeries,
  getSeriesById
};
