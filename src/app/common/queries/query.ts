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

const getVolumesForFilters = gql`
  query getVolumesForFilters($filters: VolumeFilter) {
    volumes(filters: $filters) {
      ...VolumeFields
      percentagePaid
      retailer {
        name
      }
      series {
        id
        name
      }
    }
  }
  ${Fragments.volumeFields}
`;

const getRetailers = gql`
  query GetRetailers {
    retailers {
      id
      name
    }
  }
`;

const getDashboard = gql`
  query GetDashboard {
    dashboard {
      aggregates {
        label
        average
        minimum
        maximum
      }
    }
  }
`;

export default {
  getSeries,
  getSeriesById,
  getVolumesForFilters,
  getRetailers,
  getDashboard
};
