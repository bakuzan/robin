import SeriesType from '../../common/models/series-types.enum';
import SeriesStatus from 'src/app/common/models/series-statuses.enum';

export default class SeriesFilter {
  search: string;
  type: SeriesType;
  statuses: SeriesStatus[];
}
