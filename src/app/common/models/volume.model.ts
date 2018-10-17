import Retailer from './retailer.model';

export default class Volume {
  id: number;
  number: number;
  releaseDate: string;
  boughtDate: string;
  rrp: number;
  paid: number;
  retailer: Retailer;
  retailerId: number;
}

export class VolumeInitValues {
  number: number = null;
  rrp: number = null;
  retailerId: number = null;
}