'use client';

import * as React from 'react';

import { cn, isMac } from '@kirin/utils';

const KeybindGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-1', className)}
    {...props}
  />
));
KeybindGroup.displayName = 'KeybindGroup';

interface KeybindProps {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  ctrl?: boolean;
}

const Keybind = React.forwardRef<
  React.ElementRef<'kbd'>,
  React.ComponentPropsWithoutRef<'kbd'> & KeybindProps
>(({ className, children, meta, shift, alt, ctrl, ...props }, ref) => {
  let key: React.ReactNode | string = children;

  if (meta) key = isMac() ? '⌘' : 'Ctrl';
  else if (shift) key = '⇧';
  else if (alt) key = '⌥';
  else if (ctrl) key = isMac() ? '⌃' : 'Ctrl';

  return (
    <kbd
      ref={ref}
      className={cn(
        'flex h-[25px] min-w-[25px] items-center justify-center rounded-md border bg-background px-1 text-center font-sans text-xs leading-8 text-foreground',
        className
      )}
      {...props}
    >
      <span>{key}</span>
    </kbd>
  );
});
Keybind.displayName = 'Keybind';

export { Keybind, KeybindGroup };
