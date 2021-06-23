/* eslint-disable @typescript-eslint/naming-convention */
enum SeriesType {
  Manga = 'Manga',
  Comic = 'Comic'
}
export default SeriesType;

export const SeriesTypes = Object.freeze(
  Object.keys(SeriesType).map((k) => SeriesType[k] as SeriesType)
);
