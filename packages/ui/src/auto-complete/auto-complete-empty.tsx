import { HTMLAttributes } from 'react';
import AutoCompleteSearch from './auto-complete-searching';

interface Props {
  hidden?: boolean;
  className?: string;
}

export type AutoCompleteEmptyProps = Props & HTMLAttributes<any>;

export default function AutoCompleteEmpty({
  children,
  hidden = false,
  className = '',
}: AutoCompleteEmptyProps) {
  if (hidden) return null;

  return (
    <AutoCompleteSearch className={className}>{children}</AutoCompleteSearch>
  );
}
