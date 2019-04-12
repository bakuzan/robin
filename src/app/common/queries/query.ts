import gql from 'graphql-tag';

import Fragments from './fragment';

const getSeries = gql`
  query GetSeries($filters: SeriesFilter!) {
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
  query getVolumesForFilters($filters: VolumeFilter!) {
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
  query GetDashboard($filters: DashboardFilters!) {
    dashboard(filters: $filters) {
      aggregates {
        label
        statistics {
          label
          value
        }
      }
      byMonthCounts {
        label
        name
        series {
          name
          value
        }
      }
      proportions {
        label
        data {
          name
          series {
            name
            value
          }
        }
      }
    }
  }
`;

const getUnboughtVolumes = gql`
  query UnboughtVolumes {
    unboughtVolumes {
      ...VolumeFields
      series {
        id
        name
      }
    }
  }
  ${Fragments.volumeFields}
`;

const exportVolumes = gql`
  query exportVolumes($filters: VolumeFilter!) {
    export(filters: $filters) {
      success
      messages
      data
    }
  }
`;

export default {
  getSeries,
  getSeriesById,
  getVolumesForFilters,
  getRetailers,
  getDashboard,
  getUnboughtVolumes,
  exportVolumes
};
