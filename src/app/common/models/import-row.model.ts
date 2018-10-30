import SeriesType from './series-types.enum';

class ImportSeries {
  name: string;
  type: SeriesType;
}

class ImportRetailer {
  name: string;
}

export default class ImportRow {
  series: ImportSeries;
  number: number;
  rrp: number;
  paid: number;
  boughtDate: string;
  retailer: ImportRetailer;
}
