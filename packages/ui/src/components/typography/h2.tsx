'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const h2Variants = cva(
  'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'
);

export interface H2Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h2Variants> {}

function H2({ className, children, ...props }: H2Props) {
  return (
    <h2 className={cn(h2Variants(), className)} {...props}>
      {children}
    </h2>
  );
}

export { H2 };
