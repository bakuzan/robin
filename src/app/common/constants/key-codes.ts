const keyCodes = Object.freeze({
  q: 'q',
  backspace: 'Backspace',
  enter: 'Enter',
  escape: 'Escape',
  up: 'ArrowUp',
  down: 'ArrowDown',
  space: ' '
});
export default keyCodes;

export const CLOSE_KEYS: string[] = [keyCodes.escape, keyCodes.enter];
export const OPEN_KEYS: string[] = [keyCodes.space, keyCodes.enter];
