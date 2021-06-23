/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'classnames';
import Strings from '../constants/strings';
import { pad, getFirstDateOfMonth, getLastDateOfMonth } from '.';
import {
  ViewOptionEnum,
  ICalendarViewOption
} from '../models/calendar-view-option.model';

const MS_DAY = 1000 * 60 * 60 * 24;

function setTime(date: string | number | Date, h, m, s, n) {
  const d = new Date(date);
  d.setHours(h, m, s, n);
  return d;
}

export function startOfDay(d: string | number | Date) {
  return setTime(d, 0, 0, 0, 0);
}

function getDatesAsMsAtMidnight(...dates: any[]): number[] {
  return dates.map((d: string | number | Date) =>
    startOfDay(new Date(d)).getTime()
  );
}

function datesAreEqual(d1: string | Date | number, d2: string | Date | number) {
  const [dx, dy] = getDatesAsMsAtMidnight(d1, d2);
  return dx === dy;
}

function isBefore(d1: string | number | Date, d2: string | number | Date) {
  const [dx, dy] = getDatesAsMsAtMidnight(d1, d2);
  const before = dx < dy;
  return before;
}

function isBeforeOrEqual(
  d1: string | number | Date,
  d2: string | number | Date
) {
  return isBefore(d1, d2) || datesAreEqual(d1, d2);
}

export function checkIfDatePartsMatch(
  d1: string | number | Date,
  d2: string | number | Date
) {
  const dx = new Date(d1);
  const dy = new Date(d2);
  return {
    year: dx.getFullYear() === dy.getFullYear(),
    month: dx.getMonth() === dy.getMonth(),
    date: dx.getDate() === dy.getDate()
  };
}

const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

function getDaysInMonthForDate(date: string | number | Date) {
  const d = new Date(date);
  return daysInMonth(d.getMonth() + 1, d.getFullYear());
}

function daysDifferenceBetweenDates(
  d1: string | number | Date,
  d2: string | number | Date
) {
  const a = new Date(d1).getTime();
  const b = new Date(d2).getTime();

  return Math.floor(b - a) / MS_DAY;
}

const getWeekExtreme = (check: (n: number) => number) => (
  date: string | number | Date
): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + check(day);
  d.setDate(diff);
  return d;
};
const weekBeginning = getWeekExtreme((d) => (d === 0 ? -6 : 1));
const weekEnding = getWeekExtreme((d) => (d === 0 ? 0 : 7));

const daysDifferenceFromMonday = (date: string | number | Date) =>
  Math.abs(daysDifferenceBetweenDates(date, weekBeginning(date)));
const daysDifferenceFromSunday = (date: string | number | Date) =>
  Math.abs(daysDifferenceBetweenDates(weekEnding(date), date));

export function checkDatesAgainstRange(
  { afterDate, beforeDate },
  ...comparisons: Array<string | number | Date>
) {
  const [afterCheck, beforeCheck] = comparisons;
  return (
    (afterDate && isBefore(afterCheck, afterDate)) ||
    (beforeDate && !isBeforeOrEqual(beforeCheck || afterCheck, beforeDate))
  );
}

const getMonthName = (date: string | number | Date) =>
  Strings.monthNames[new Date(date).getMonth()];

export const displayYearOnly = (d: string | number | Date) =>
  `${new Date(d).getFullYear()}`;

export const displayMonthAndYear = (d: string | number | Date) =>
  `${getMonthName(d)} ${displayYearOnly(d)}`;

export function adjustDateDay(
  date: string | number | Date,
  adjustment: number
) {
  const d = new Date(date);
  return formatDateForInput(
    new Date(d.getFullYear(), d.getMonth(), d.getDate() + adjustment)
  );
}

export function adjustDateMonth(
  date: string | number | Date,
  adjustment: number
) {
  const d = new Date(date);
  return formatDateForInput(
    new Date(d.getFullYear(), d.getMonth() + adjustment, d.getDate())
  );
}

export function adjustDateYear(
  date: string | number | Date,
  adjustment: number
) {
  const d = new Date(date);
  return formatDateForInput(
    new Date(d.getFullYear() + adjustment, d.getMonth(), d.getDate())
  );
}

export function formatDateForInput(d: string | number | Date) {
  if (!d) {
    return '';
  }

  const date = new Date(d);
  const year = date.getFullYear();
  const month = pad(`${date.getMonth() + 1}`, 2);
  const day = pad(`${date.getDate()}`, 2);
  return `${year}-${month}-${day}`;
}

const mapToViewOption = (optionType: ViewOptionEnum) => (
  text: string | number
) => {
  const isMonth = optionType === ViewOptionEnum.MONTH;
  const isDummy = optionType === ViewOptionEnum.DUMMY_DAY;

  const className = classNames({
    'calendar-view__option--dummy-day': isDummy,
    'calendar-view__option--day': !isMonth,
    'calendar-view__option--month': isMonth
  });

  return {
    text,
    optionType,
    className,
    isDummy
  };
};

export const getMonthsForDate = () =>
  Strings.monthNames.map(mapToViewOption(ViewOptionEnum.MONTH));

export const getDaysForDate = (date: string | number | Date) => {
  const d = new Date(date);
  const monthLength = getDaysInMonthForDate(d);
  const firstOfMonth = getFirstDateOfMonth(d);
  const lastOfMonth = getLastDateOfMonth(d);
  const startDummyDays = daysDifferenceFromMonday(firstOfMonth);
  const endDummyDays = daysDifferenceFromSunday(lastOfMonth);
  return [
    ...Array(startDummyDays)
      .fill('')
      .map(mapToViewOption(ViewOptionEnum.DUMMY_DAY)),
    ...Array(monthLength)
      .fill(null)
      .map((_, num) => num + 1)
      .map(mapToViewOption(ViewOptionEnum.DAY)),
    ...Array(endDummyDays)
      .fill('')
      .map(mapToViewOption(ViewOptionEnum.DUMMY_DAY))
  ];
};

export const checkIfSelectedForView = (
  { selected, viewDate },
  option: ICalendarViewOption
) => {
  const selectedDate = new Date(selected);
  const matches = checkIfDatePartsMatch(viewDate, selectedDate);
  return (
    (option.optionType === ViewOptionEnum.DAY &&
      matches.year &&
      matches.month &&
      option.text === selectedDate.getDate()) ||
    (option.optionType === ViewOptionEnum.MONTH &&
      matches.year &&
      Strings.monthNames.findIndex((x) => x === option.text) ===
        selectedDate.getMonth())
  );
};

export const dateIsOutOfRange = (
  { isMonthView, viewDate },
  option: ICalendarViewOption,
  { afterDate, beforeDate }
) => {
  const { text: value } = option;

  if ((!afterDate && !beforeDate) || !value) {
    return false;
  }

  if (isMonthView) {
    const date = new Date(viewDate);
    date.setDate(value as number);
    return checkDatesAgainstRange({ afterDate, beforeDate }, date);
  } else {
    const d = new Date(viewDate);
    d.setDate(1);
    d.setMonth(Strings.monthNames.findIndex((x) => x === value));
    const firstOfMonth = getFirstDateOfMonth(d);
    const lastOfMonth = getLastDateOfMonth(d);
    return checkDatesAgainstRange(
      { afterDate, beforeDate },
      lastOfMonth,
      firstOfMonth
    );
  }
};

export function formatDateForDisplay(date: string | number | Date) {
  const d = new Date(date);
  return `${pad(`${d.getDate()}`, 2)} ${getMonthName(d)} ${d.getFullYear()}`;
}

/* eslint-disable no-bitwise */
function ordinal(num: number) {
  const d = num % 10;
  return ~~((num % 100) / 10) === 1
    ? 'th'
    : d === 1
    ? 'st'
    : d === 2
    ? 'nd'
    : d === 3
    ? 'rd'
    : 'th';
}
/* eslint-enable no-bitwise */

export function addDateSuffix(
  isMonthView: boolean,
  viewDate: string,
  date: string | number
) {
  const activeDate = new Date(viewDate);

  if (!isMonthView) {
    return `${date} ${displayYearOnly(activeDate)}`;
  }

  return `${date}${ordinal(Number(date))} ${displayMonthAndYear(activeDate)}`;
}
