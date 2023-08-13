'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const largeVariants = cva('text-lg font-semibold');

export interface LargeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof largeVariants> {}

function Large({ className, children, ...props }: LargeProps) {
  return (
    <div className={cn(largeVariants(), className)} {...props}>
      {children}
    </div>
  );
}

export { Large };
