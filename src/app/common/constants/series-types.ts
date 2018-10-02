import { mapEnumsToObject } from 'src/app/common/utils/mappers';

class SeriesTypeModel {
  Manga: string;
  Comic: string;
}

const SeriesType = Object.freeze(['Manga', 'Comic']);

export default SeriesType;

export const SeriesTypes = mapEnumsToObject<SeriesTypeModel>(SeriesType);
