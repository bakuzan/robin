import Series from '../models/series.model';

export function isSeries(data: any): data is Series {
  return (data as Series).volumes !== undefined;
}
