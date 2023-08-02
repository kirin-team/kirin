'use client';

import ErrorComponent from '../../components/Error';
import { PropsWithDefault } from '../../types';

export default function GlobalError({
  lang,
}: PropsWithDefault<{
  error: Error;
  reset: () => void;
}>) {
  return (
    <html lang={lang}>
      <body>
        <ErrorComponent />
      </body>
    </html>
  );
}
