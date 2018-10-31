import Retailer from './retailer.model';
import Series from './series.model';

export default class Volume {
  id: number;
  number: number;
  releaseDate: string;
  boughtDate: string;
  rrp: number;
  paid: number;
  percentagePaid: number;
  series: Series;
  retailer: Retailer;
  retailerId: number;
  usedDiscountCode: boolean;
}

export class VolumeInitValues {
  number: number = null;
  rrp: number = null;
  retailer: Retailer;
}
