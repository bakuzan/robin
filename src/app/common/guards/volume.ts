import Volume from '../models/volume.model';

export function isVolume(data: any): data is Volume {
  return (<Volume>data).retailer !== undefined;
}
