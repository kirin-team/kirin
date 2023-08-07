import { ButtonHTMLAttributes } from 'react';
import { usePaginationContext } from './pagination-context';
import PaginationItem from './pagination-item';

export type PaginationPreviousProps = ButtonHTMLAttributes<any>;

export default function PaginationPrevious({
  children,
  ...props
}: PaginationPreviousProps) {
  const { update, isFirst } = usePaginationContext();

  return (
    <PaginationItem
      onClick={() => update && update('prev')}
      disabled={isFirst}
      {...props}
    >
      {children}
    </PaginationItem>
  );
}
