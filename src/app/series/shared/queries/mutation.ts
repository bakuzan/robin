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

const createVolume = gql`
  mutation CreateVolume($volume: VolumeInput) {
    volumeCreate(volume: $volume) {
      ...VolumeFields
    }
  }
  ${Fragments.volumeFields}
`;

const updateVolume = gql`
  mutation UpdateVolume($volume: VolumeInput) {
    volumeUpdate(volume: $volume) {
      ...VolumeFields
    }
  }
  ${Fragments.volumeFields}
`;

export default {
  createSeries,
  updateSeries,
  createVolume,
  updateVolume
};
