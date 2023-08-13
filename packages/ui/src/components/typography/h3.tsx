'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const h3Variants = cva('scroll-m-20 text-2xl font-semibold tracking-tight');

export interface H3Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h3Variants> {}

function H3({ className, children, ...props }: H3Props) {
  return (
    <h3 className={cn(h3Variants(), className)} {...props}>
      {children}
    </h3>
  );
}

export { H3 };
