import SeriesType from './series-types.enum';

export default class Series {
  id: number;
  name = '';
  type: SeriesType;
  volumeCount: number = null;
}
