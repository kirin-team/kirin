import { MutableRefObject, useEffect, useRef } from 'react';

export type ClickAwayGetContainer = () => HTMLElement | null;

export default function useClickAway(
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => void
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      const el = ref.current;
      if (!event || !el || el.contains(event.target as Node)) return;
      handlerRef.current(event);
    };

    document.addEventListener('click', callback);

    return () => document.removeEventListener('click', callback);
  }, [ref]);
}
