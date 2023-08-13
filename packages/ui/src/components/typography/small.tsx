'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const smallVariants = cva('text-sm font-medium leading-none');

export interface SmallProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof smallVariants> {}

function Small({ className, children, ...props }: SmallProps) {
  return (
    <small className={cn(smallVariants(), className)} {...props}>
      {children}
    </small>
  );
}

export { Small };
