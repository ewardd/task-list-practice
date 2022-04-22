import { RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent | KeyboardEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | (T | null),
  handler: (event: AnyEvent) => void,
  excludeElements?: HTMLCollectionOf<Element>,
): void => {
  useEffect(() => {
    const element = ref ? ('current' in ref ? ref?.current : ref) : null;

    const listener = (event: AnyEvent) => {
      const target = event.target as Node;

      if (!element) return;

      if (element.contains(target)) return;

      if (excludeElements && [...excludeElements].some((node) => node.contains(target))) return;

      handler(event);
    };

    const onEscapePressed = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const target = event.target as Node;

        if (event.target && 'blur' in event.target) {
          (event.target as HTMLInputElement).blur();
        }

        if (!element) return;

        if (element.contains(target)) return;
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    document.addEventListener('keydown', onEscapePressed);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keydown', onEscapePressed);
    };
  }, [ref, handler, excludeElements]);
};
