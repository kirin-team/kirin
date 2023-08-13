'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const h1Variants = cva(
  'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
);

export interface H1Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h1Variants> {}

function H1({ className, children, ...props }: H1Props) {
  return (
    <h1 className={cn(h1Variants(), className)} {...props}>
      {children}
    </h1>
  );
}

export { H1 };
