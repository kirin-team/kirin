import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = state;
  });

  return ref ? ref.current : null;
}
