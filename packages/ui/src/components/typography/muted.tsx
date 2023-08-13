'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const mutedVariants = cva('text-sm text-muted-foreground');

export interface MutedProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof mutedVariants> {}

function Muted({ className, children, ...props }: MutedProps) {
  return (
    <p className={cn(mutedVariants(), className)} {...props}>
      {children}
    </p>
  );
}

export { Muted };
