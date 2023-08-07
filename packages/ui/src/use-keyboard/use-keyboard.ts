import {
  KeyboardEventHandler,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
} from 'react';
import { KeyCode } from './codes';

export type KeyboardOptions = {
  disableGlobalEvent?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  capture?: boolean;
  event?: 'keydown' | 'keypress' | 'keyup';
};

export type KeyboardResult = {
  bindings: {
    onKeyDown: KeyboardEventHandler;
    onKeyDownCapture: KeyboardEventHandler;
    onKeyPress: KeyboardEventHandler;
    onKeyPressCapture: KeyboardEventHandler;
    onKeyUp: KeyboardEventHandler;
    onKeyUpCapture: KeyboardEventHandler;
  };
};

export type UseKeyboardHandler = (
  event: ReactKeyboardEvent | KeyboardEvent
) => void;

export default function useKeyboard(
  handler: UseKeyboardHandler,
  keyBindings: Array<KeyCode> | KeyCode,
  options: KeyboardOptions = {}
): KeyboardResult {
  const bindings = Array.isArray(keyBindings)
    ? (keyBindings as KeyCode[])
    : [keyBindings];

  const {
    disableGlobalEvent = false,
    capture = false,
    stopPropagation = false,
    preventDefault = true,
    event = 'keydown',
  } = options;

  const eventHandler = (event: ReactKeyboardEvent | KeyboardEvent) => {
    if (
      (bindings.includes(KeyCode.ShiftLeft) ||
        bindings.includes(KeyCode.ShiftRight)) &&
      !event.shiftKey
    )
      return;

    if (
      (bindings.includes(KeyCode.AltLeft) ||
        bindings.includes(KeyCode.AltRight)) &&
      !event.altKey
    )
      return;

    if (
      (bindings.includes(KeyCode.ControlLeft) ||
        bindings.includes(KeyCode.ControlRight)) &&
      !event.ctrlKey
    )
      return;

    if (
      (bindings.includes(KeyCode.OSLeft) ||
        bindings.includes(KeyCode.OSRight) ||
        bindings.includes(KeyCode.MetaLeft) ||
        bindings.includes(KeyCode.MetaRight)) &&
      !event.metaKey
    )
      return;

    const hitOne = bindings.some((key) => key === event.key);

    if (!hitOne) return;
    if (stopPropagation) event.stopPropagation();
    if (preventDefault) event.preventDefault();

    handler(event);
  };

  useEffect(() => {
    if (!disableGlobalEvent) document.addEventListener(event, eventHandler);
    return () => document.removeEventListener(event, eventHandler);
  }, [disableGlobalEvent]);

  const elementBindingHandler = (
    elementEventType: 'keydown' | 'keypress' | 'keyup',
    isCapture: boolean = false
  ) => {
    if (elementEventType !== event) return () => {};
    if (isCapture !== capture) return () => {};

    return (e: ReactKeyboardEvent | KeyboardEvent) => eventHandler(e);
  };

  return {
    bindings: {
      onKeyDown: elementBindingHandler('keydown'),
      onKeyDownCapture: elementBindingHandler('keydown', true),
      onKeyPress: elementBindingHandler('keypress'),
      onKeyPressCapture: elementBindingHandler('keypress', true),
      onKeyUp: elementBindingHandler('keyup'),
      onKeyUpCapture: elementBindingHandler('keyup', true),
    },
  };
}
