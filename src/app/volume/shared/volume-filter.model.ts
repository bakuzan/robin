import SeriesType from '../../common/models/series-types.enum';

export default class VolumeFilter {
  type: SeriesType;
  fromDate: string;
  toDate: string;
}
