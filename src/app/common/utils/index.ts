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
