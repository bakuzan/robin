import Series from '../models/series.model';

export function isSeries(data: any): data is Series {
  return (<Series>data).volumes !== undefined;
}
