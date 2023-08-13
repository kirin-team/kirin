'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@kirin/utils';

const blockquoteVariants = cva('mt-6 border-l-2 pl-6 italic');

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {}

function Blockquote({ className, children, ...props }: BlockquoteProps) {
  return (
    <blockquote className={cn(blockquoteVariants(), className)} {...props}>
      {children}
    </blockquote>
  );
}

export { Blockquote };
