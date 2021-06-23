/* eslint-disable @typescript-eslint/naming-convention */
enum SeriesStatus {
  Planned = 'Planned',
  Ongoing = 'Ongoing',
  Complete = 'Complete',
  Dropped = 'Dropped'
}
export default SeriesStatus;

export const SeriesStatuses = Object.freeze(
  Object.keys(SeriesStatus).map((k) => SeriesStatus[k] as SeriesStatus)
);
