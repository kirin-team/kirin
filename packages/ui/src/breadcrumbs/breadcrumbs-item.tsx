import {
  AnchorHTMLAttributes,
  MouseEvent,
  Ref,
  forwardRef,
  useMemo,
} from 'react';
import Link from '../link';
import { Props as LinkBasicProps } from '../link/link';
import useClasses from '../use-classes';
import { pickChild } from '../utils/collections';
import BreadcrumbsSeparator from './breadcrumbs-separator';

interface Props {
  href?: string;
  nextLink?: boolean;
  onClick?: (event: MouseEvent) => void;
  className?: string;
}

type NativeAttrs = Omit<AnchorHTMLAttributes<any>, keyof Props>;
type NativeLinkAttrs = Omit<NativeAttrs, keyof LinkBasicProps>;
export type BreadcrumbsItemProps = Props & NativeLinkAttrs;

const BreadcrumbsItem = forwardRef(
  (
    {
      href,
      nextLink = false,
      onClick,
      children,
      className = '',
      ...props
    }: BreadcrumbsItemProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const isLink = useMemo(
      () => href !== undefined || nextLink,
      [href, nextLink]
    );

    const [withoutSepChildren] = pickChild(children, BreadcrumbsSeparator);

    const clickHandler = (event: MouseEvent) => onClick && onClick(event);

    const classes = useClasses('breadcrumbs-item', className);

    if (!isLink)
      return (
        <span className={classes} onClick={clickHandler}>
          {withoutSepChildren}
        </span>
      );

    return (
      <Link
        className={classes}
        href={href}
        onClick={clickHandler}
        ref={ref}
        {...props}
      >
        {withoutSepChildren}
      </Link>
    );
  }
);

BreadcrumbsItem.displayName = 'BreadcrumbsItem';

export default BreadcrumbsItem;
