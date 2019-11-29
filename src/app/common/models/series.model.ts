import SeriesType from './series-types.enum';
import Volume from './volume.model';

export default interface Series {
  id: number;
  name: string;
  type: SeriesType;
  volumeCount: number;
  volumes: Volume[];
  volumeAverage: string;
}
