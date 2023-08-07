import { ButtonHTMLAttributes } from 'react';
import { usePaginationContext } from './pagination-context';
import PaginationItem from './pagination-item';

export type PaginationNextProps = ButtonHTMLAttributes<any>;

export default function PaginationNext({
  children,
  ...props
}: PaginationNextProps) {
  const { update, isLast } = usePaginationContext();

  return (
    <PaginationItem
      onClick={() => update && update('next')}
      disabled={isLast}
      {...props}
    >
      {children}
    </PaginationItem>
  );
}
