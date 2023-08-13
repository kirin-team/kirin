'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const codeVariants = cva(
  'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

function Code({ className, children, ...props }: CodeProps) {
  return (
    <code className={cn(codeVariants(), className)} {...props}>
      {children}
    </code>
  );
}

export { Code };
