import { useCallback, useEffect } from 'react';

export default function useResize(
  callback: () => unknown,
  immediatelyInvoke: boolean = true
) {
  const fn = useCallback(callback, []);

  useEffect(() => {
    if (immediatelyInvoke) fn();

    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
}
