'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const h4Variants = cva('scroll-m-20 text-xl font-semibold tracking-tight');

export interface H4Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h4Variants> {}

function H4({ className, children, ...props }: H4Props) {
  return (
    <h4 className={cn(h4Variants(), className)} {...props}>
      {children}
    </h4>
  );
}

export { H4 };
