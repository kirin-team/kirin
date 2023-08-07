import { useEffect, useState } from 'react';
import { isBrowser } from './collections';

export type SSRState = {
  isBrowser: boolean;
  isServer: boolean;
};

export default function useSSR(): SSRState {
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    setBrowser(isBrowser());
  }, []);

  return {
    isBrowser: browser,
    isServer: !browser,
  };
}
