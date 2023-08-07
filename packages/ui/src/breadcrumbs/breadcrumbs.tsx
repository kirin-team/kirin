import React, {
  Children,
  Fragment,
  ReactNode,
  isValidElement,
  useMemo,
} from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import BreadcrumbsSeparator from './breadcrumbs-separator';

interface Props {
  separator?: string | ReactNode;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type BreadcrumbsProps = Props & NativeAttrs;

function Breadcrumbs({
  separator = '/',
  children,
  className = '',
}: BreadcrumbsProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const hoverColor = useMemo(
    () => addColorAlpha(theme.palette.link, 0.85),
    [theme.palette.link]
  );

  const childrenArray = Children.toArray(children);
  const withSeparatorChildren = childrenArray.map((item, index) => {
    if (!isValidElement(item)) return item;
    const last = childrenArray[index - 1];

    const lastIsSeparator =
      isValidElement(last) && last.type === BreadcrumbsSeparator;

    const currentIsSeparator = item.type === BreadcrumbsSeparator;

    if (!lastIsSeparator && !currentIsSeparator && !!index)
      return (
        <Fragment key={index}>
          <BreadcrumbsSeparator>{separator}</BreadcrumbsSeparator>
          {item}
        </Fragment>
      );

    return item;
  });

  return (
    <nav className={className}>
      {withSeparatorChildren}

      <style jsx>{`
        nav {
          line-height: inherit;
          color: ${theme.palette.accents_4};
          box-sizing: border-box;
          display: flex;
          align-items: center;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        nav :global(.link:hover) {
          color: ${hoverColor};
        }

        nav > :global(span:last-of-type) {
          color: ${theme.palette.accents_6};
        }

        nav > :global(.separator:last-child) {
          display: none;
        }

        nav :global(svg) {
          width: 1em;
          height: 1em;
          margin: 0 4px;
        }

        nav :global(.breadcrumbs-item) {
          display: inline-flex;
          align-items: center;
        }
      `}</style>
    </nav>
  );
}

export default withScale(Breadcrumbs);
