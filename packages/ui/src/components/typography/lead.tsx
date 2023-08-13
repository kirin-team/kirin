'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const leadVariants = cva('text-xl text-muted-foreground');

export interface LeadProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof leadVariants> {}

function Lead({ className, children, ...props }: LeadProps) {
  return (
    <p className={cn(leadVariants(), className)} {...props}>
      {children}
    </p>
  );
}

export { Lead };
