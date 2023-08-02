import { PropsWithChildren } from 'react';
import { Locale } from '../middleware';

export type PropsWithDefault<P = unknown> = P &
  PropsWithChildren<{
    lang: Locale;
  }>;
