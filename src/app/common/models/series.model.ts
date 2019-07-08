import SeriesType from './series-types.enum';
import Volume from './volume.model';

export default class Series {
  id: number;
  name = '';
  type: SeriesType = null;
  volumeCount: number = null;
  volumes: Volume[] = [];
  volumeAverage: string;
}
