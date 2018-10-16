/*tslint:disable:no-bitwise*/

import Listeners from './listeners.model';
import { Strings } from 'src/app/common/constants';

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

export const pad = (n: string, width: number, z = '0'): string =>
  n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

export const getDaysAgo = (date, num = 1) => {
  const d = new Date(date);
  d.setDate(d.getDate() - num);
  return d;
};

export const getISOStringDate = (d = new Date()) =>
  new Date(d).toISOString().split('T')[0];

export const isValidDate = (d: string): boolean => {
  const maybeDate = Date.parse(d);
  return maybeDate && maybeDate > 0;
};
