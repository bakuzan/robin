import keyCodes from '../constants/key-codes';
import { createListeners } from './index';

export default function addOutsideClick(
  element: HTMLElement,
  onOutsideClick: (event: Event) => void
) {
  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isDescendantOfRoot = element.contains(target);

    if (!isDescendantOfRoot) {
      onOutsideClick(event);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (keyCodes.escape === event.key) {
      onOutsideClick(event);
    }
  }

  const keyCtrl = createListeners('keydown', handleKeyDown)();
  keyCtrl.listen();

  const clickCtrl = createListeners('click', handleClick)();
  clickCtrl.listen();

  return () => {
    keyCtrl.remove();
    clickCtrl.remove();
  };
}
