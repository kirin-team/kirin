import { KeyCode, KeyMod } from './codes';

export function getActiveModMap(
  bindings: KeyCode[]
): Record<keyof typeof KeyMod, boolean> {
  const modBindings = bindings.filter(
    (item: KeyCode) => !!KeyMod[item as KeyMod]
  );

  const activeModMap: Record<KeyMod, boolean> = {
    OSLeft: false,
    OSRight: false,
    MetaLeft: false,
    MetaRight: false,
    ControlLeft: false,
    ControlRight: false,
    AltLeft: false,
    AltRight: false,
    ShiftLeft: false,
    ShiftRight: false,
  };

  modBindings.forEach((code) => {
    const modKey = KeyMod[code as KeyMod] as KeyMod;
    activeModMap[modKey] = true;
  });

  return activeModMap;
}
