import gql from 'graphql-tag';

import Fragments from './fragment';

const createSeries = gql`
  mutation CreateSeries($series: SeriesInput) {
    seriesCreate(series: $series) {
      ...SeriesViewFields
    }
  }
  ${Fragments.viewFields}
`;

const updateSeries = gql`
  mutation UpdateSeries($series: SeriesInput) {
    seriesUpdate(series: $series) {
      ...SeriesViewFields
    }
  }
  ${Fragments.viewFields}
`;

export default {
  createSeries,
  updateSeries
};
