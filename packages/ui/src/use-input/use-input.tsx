import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from 'react';
import useCurrentState from '../utils/use-current-state';

export type BindingsChangeTarget =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string;

export default function useInput(initialValue: string): {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  currentRef: MutableRefObject<string>;
  reset: () => void;
  bindings: { value: string; onChange: (event: BindingsChangeTarget) => void };
} {
  const [state, setState, currentRef] = useCurrentState(initialValue);

  return {
    state,
    setState,
    currentRef,
    reset: () => setState(initialValue),
    bindings: {
      value: state,
      onChange: (event: BindingsChangeTarget) => {
        if (typeof event === 'object' && event.target) {
          setState(event.target.value);
        } else {
          setState(event as string);
        }
      },
    },
  };
}
