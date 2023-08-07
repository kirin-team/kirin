import { Children, HTMLAttributes, useEffect, useMemo } from 'react';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import useCurrentState from '../utils/use-current-state';
import {
  PaginationConfig,
  PaginationContext,
  PaginationUpdateType,
} from './pagination-context';
import PaginationNext from './pagination-next';
import PaginationPages from './pagination-pages';
import PaginationPrevious from './pagination-previous';

interface Props {
  page?: number;
  initialPage?: number;
  count?: number;
  limit?: number;
  onChange?: (val: number) => void;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type PaginationProps = Props & NativeAttrs;

function Pagination({
  page: customPage,
  initialPage = 1,
  count = 1,
  limit = 7,
  children,
  onChange,
  className = '',
  ...props
}: PaginationProps) {
  const { SCALES } = useScale();
  const [page, setPage, pageRef] = useCurrentState(initialPage);

  const [, prevChildren] = pickChild(children, PaginationPrevious);
  const [, nextChildren] = pickChild(children, PaginationNext);

  const [prevItem, nextItem] = useMemo(() => {
    const hasChildren = (c: any) => !!Children.count(c);

    const prevDefault = <PaginationPrevious>prev</PaginationPrevious>;
    const nextDefault = <PaginationNext>next</PaginationNext>;

    return [
      hasChildren(prevChildren) ? prevChildren : prevDefault,
      hasChildren(nextChildren) ? nextChildren : nextDefault,
    ];
  }, [prevChildren, nextChildren]);

  const update = (type: PaginationUpdateType) => {
    if (type === 'prev' && !!pageRef.current) setPage((last) => last - 1);
    if (type === 'next' && pageRef.current < count) setPage((last) => last + 1);
  };

  const values = useMemo<PaginationConfig>(
    () => ({
      isFirst: page <= 1,
      isLast: page >= count,
      update,
    }),
    [page, count]
  );

  useEffect(() => {
    onChange?.(page);
  }, [page]);

  useEffect(() => {
    if (customPage !== undefined) setPage(customPage);
  }, [customPage]);

  return (
    <PaginationContext.Provider value={values}>
      <nav className={className} {...props}>
        {prevItem}
        <PaginationPages
          count={count}
          current={page}
          limit={limit}
          setPage={setPage}
        />
        {nextItem}
      </nav>

      <style jsx>{`
        nav {
          font-variant: tabular-nums;
          font-feature-settings: 'tnum';
          --pagination-size: ${SCALES.font(2)};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        nav :global(button:last-of-type) {
          margin-right: 0;
        }
      `}</style>
    </PaginationContext.Provider>
  );
}

export default withScale(Pagination);
