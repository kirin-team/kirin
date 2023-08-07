import { PropsWithChildren, useMemo, useState } from 'react';
import { KirinThemes } from '../themes/presets';
import ToastContainer from '../use-toasts/toast-container';
import useCurrentState from '../utils/use-current-state';
import {
  KirinContent,
  KirinContextParams,
  UpdateToastsFunction,
  UpdateToastsIDFunction,
  UpdateToastsLayoutFunction,
  defaultToastLayout,
} from '../utils/use-kirin-context';
import ThemeProvider from './theme-provider';

interface Props {
  themes?: Array<KirinThemes>;
  themeType?: string | 'dark' | 'light';
}

export type KirinProviderProps = Props;

export default function KirinProvider({
  themes,
  themeType,
  children,
}: PropsWithChildren<KirinProviderProps>) {
  const [lastUpdateToastId, setLastUpdateToastId] =
    useState<KirinContextParams['lastUpdateToastId']>(null);

  const [toasts, setToasts, toastsRef] = useCurrentState<
    KirinContextParams['toasts']
  >([]);

  const [toastLayout, setToastLayout, toastLayoutRef] =
    useCurrentState<KirinContextParams['toastLayout']>(defaultToastLayout);

  const updateToasts: UpdateToastsFunction = (fn) => {
    const nextToasts = fn(toastsRef.current);
    setToasts(nextToasts);
  };

  const updateToastLayout: UpdateToastsLayoutFunction = (fn) => {
    const nextLayout = fn(toastLayoutRef.current);
    setToastLayout(nextLayout);
  };

  const updateLastToastId: UpdateToastsIDFunction = (fn) => {
    setLastUpdateToastId(fn());
  };

  const initialValue = useMemo<KirinContextParams>(
    () => ({
      toasts,
      toastLayout,
      updateToasts,
      lastUpdateToastId,
      updateToastLayout,
      updateLastToastId,
    }),
    [toasts, toastLayout, lastUpdateToastId]
  );

  return (
    <KirinContent.Provider value={initialValue}>
      <ThemeProvider themes={themes} themeType={themeType}>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </KirinContent.Provider>
  );
}
