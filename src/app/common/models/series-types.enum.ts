enum SeriesType {
  Manga = 'Manga',
  Comic = 'Comic'
}
export default SeriesType;

export const SeriesTypes = Object.freeze(
  Object.keys(SeriesType).map((k) => SeriesType[k] as SeriesType)
);
