import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@kirin/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        secondary:
          "shadow-border bg-background-100 text-foreground hover:bg-foreground/[.09]",
        tertiary: "bg-transparent text-foreground hover:bg-foreground/[.09]",
        destructive: "bg-error text-background hover:bg-error-light",
        warning: "bg-warning text-background hover:bg-warning-dark",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded px-3",
        lg: "h-10 rounded px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
          {children}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
