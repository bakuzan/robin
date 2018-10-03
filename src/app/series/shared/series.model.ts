import SeriesType from './series-types.enum';

export default class Series {
  name = '';
  type: SeriesType;
  volumeCount: number = null;
}
