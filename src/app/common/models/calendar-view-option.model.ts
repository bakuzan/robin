export enum ViewOptionEnum {
  DUMMY_DAY = 1,
  DAY = 2,
  MONTH = 3
}

export interface ICalendarViewOption {
  text: string | number;
  optionType: ViewOptionEnum;
  className?: string;
  isDummy: boolean;
}
