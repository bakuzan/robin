/*tslint:disable:no-bitwise*/

import Listeners from './listeners.model';
import { Strings } from 'src/app/common/constants';
import ElementCoordinates from './element-coordinates.model';

export const getWindowScrollPosition: Function = (): number =>
  window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

export const createListeners: Function = (
  t: string,
  f: EventListener
): Function => (el: any = document): Listeners => ({
  listen: (): void => el.addEventListener(t, f),
  remove: (): void => el.removeEventListener(t, f)
});

const isTypeOf = (t) => (v) => typeof v === t;
export const isObject = isTypeOf(Strings.object);
export const isString = isTypeOf(Strings.string);
export const isNumber = isTypeOf(Strings.number);
export const isArray = (v) => v instanceof Array;

export const parseIfInt = (val) => {
  const maybeInt = parseInt(val, 10);
  return maybeInt === 0 || !!maybeInt ? maybeInt : val;
};

export const getEventValue = ({ type, checked, value }) =>
  type === Strings.checkbox
    ? checked
    : type === Strings.date || type === Strings.text
      ? value
      : parseIfInt(value);

export const generateUniqueId = (): string =>
  (`${1e7}` + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (s) => {
    const c: number = Number(s);
    return (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16);
  });

export const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}` as any)}e-${decimals}`);

export const roundTo2 = (n) => round(n, 2);

export const displayAs2dp = (n: number): string =>
  n !== null && n !== undefined ? n.toFixed(2) : null;

export const pad = (n = '', width: number, z = '0'): string =>
  n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

export const getDaysAgo = (date, num = 1) => {
  const d = new Date(date);
  d.setDate(d.getDate() - num);
  return d;
};

export const localDateStringToDate = (ds: string): Date =>
  new Date(
    ds
      .trim()
      .split('/')
      .reverse()
      .join('-')
  );

export const getISOStringDate = (d = new Date()): string =>
  new Date(d).toISOString().split('T')[0];

export const isValidDate = (d: string): boolean => {
  const maybeDate = Date.parse(d);
  return maybeDate && maybeDate > 0;
};

export const currencyToPlainNumber = (str = ''): number => {
  const sn = str.trim().slice(1);
  return parseFloat(sn) ? Number(sn) : null;
};

export function getElementCoordinates(elem): ElementCoordinates {
  const box = elem.getBoundingClientRect();
  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const clientWidth = docEl.clientWidth;
  const clientHeight = docEl.clientHeight;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left),
    right: Math.round(clientWidth - (left + box.width)),
    bottom: Math.round(clientHeight - (top + box.height))
  };
}

export const capitalise = (str = ''): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const capitaliseEachWord = (str: string): string =>
  str
    .split(' ')
    .map(capitalise)
    .join(' ');

export const getFirstDateOfMonth = (date: string | number | Date): Date => {
  const d = new Date(date);
  d.setDate(1);
  return d;
};

export const getLastDateOfMonth = (date: string | number | Date): Date => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};
