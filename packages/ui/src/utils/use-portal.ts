import { useEffect, useState } from 'react';
import { getId } from './collections';
import useSSR from './use-ssr';

function createElement(id: string): HTMLElement {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
}

export default function usePortal(
  selectId: string = getId(),
  getContainer?: () => HTMLElement | null
): HTMLElement | null {
  const id = `kirin-${selectId}`;

  const { isBrowser } = useSSR();
  const [elSnapshot, setElSnapshot] = useState(
    isBrowser ? createElement(id) : null
  );

  useEffect(() => {
    const customContainer = getContainer ? getContainer() : null;
    const parentElement = customContainer || document.body;
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) parentElement.appendChild(el);
    setElSnapshot(el);
  }, []);

  return elSnapshot;
}
