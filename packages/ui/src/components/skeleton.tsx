import { cn } from "@kirin/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
