'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const pVariants = cva('leading-7 [&:not(:first-child)]:mt-6');

export interface PProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof pVariants> {}

function P({ className, children, ...props }: PProps) {
  return (
    <p className={cn(pVariants(), className)} {...props}>
      {children}
    </p>
  );
}

export { P };
