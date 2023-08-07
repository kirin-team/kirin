import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import useCurrentState from '../utils/use-current-state';

export type UseTabsResult = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  currentRef: MutableRefObject<string>;
  bindings: {
    value: string;
    onChange: (val: string) => void;
  };
};

export default function useTabs(initialValue: string): UseTabsResult {
  const [state, setState, currentRef] = useCurrentState<string>(initialValue);

  return {
    state,
    setState,
    currentRef,
    bindings: {
      value: state,
      onChange: (val: string) => {
        setState(val);
      },
    },
  };
}
