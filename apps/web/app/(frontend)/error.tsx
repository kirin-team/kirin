'use client';

import ErrorComponent from '../../components/Error';
import { PropsWithDefault } from '../../types';

export default function Error({}: PropsWithDefault<{
  error: Error;
  reset: () => void;
}>) {
  return <ErrorComponent />;
}
