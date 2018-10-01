import Listeners from './listeners.model';

export const getWindowScrollPosition: Function = (): number =>
  window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

export const createListeners: Function = (
  t: string,
  f: EventListener
): Function => (el: any = document): Listeners => ({
  listen: (): void => el.addEventListener(t, f),
  remove: (): void => el.removeEventListener(t, f)
});
