'use client';

import { CssBaseline, KirinProvider } from '@kirin/ui';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <KirinProvider themeType="dark">
      <CssBaseline />
      {children}
    </KirinProvider>
  );
}
