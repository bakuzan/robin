const keyCodes = Object.freeze({
  q: 'q',
  backspace: 'Backspace',
  enter: 'Enter',
  escape: 'Escape',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  space: ' '
});
export default keyCodes;

export const CLOSE_KEYS: string[] = [keyCodes.escape, keyCodes.enter];
export const OPEN_KEYS: string[] = [keyCodes.space, keyCodes.enter];
export const ARROW_KEYS: string[] = [
  keyCodes.up,
  keyCodes.down,
  keyCodes.left,
  keyCodes.right
];
