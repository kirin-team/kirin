import NextLink from 'next/link';
import { AnchorHTMLAttributes, Ref, forwardRef } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import LinkIcon from './icon';

export interface Props {
  useNext?: boolean;
  href?: string;
  color?: boolean;
  icon?: boolean;
  underline?: boolean;
  block?: boolean;
  className?: string;
}

type NativeAttrs = Omit<AnchorHTMLAttributes<any>, keyof Props>;
export type LinkProps = Props & NativeAttrs;

const Link = forwardRef(
  (
    {
      useNext = false,
      href = '',
      color = false,
      underline = false,
      children,
      className = '',
      icon = false,
      ...props
    }: LinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const Component = useNext ? NextLink : 'a';

    const theme = useTheme();
    const { SCALES } = useScale();
    const classes = useClasses('link', { block: useNext }, className);

    const linkColor = color || useNext ? theme.palette.link : 'inherit';
    const hoverColor =
      color || useNext ? theme.palette.successLight : 'inherit';
    const decoration = underline ? 'underline' : 'none';

    return (
      <Component className={classes} href={href} {...props} ref={ref}>
        {children}
        {icon && <LinkIcon />}

        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            border-radius: ${useNext ? theme.layout.radius : 0};
            transition: color 200ms ease 0ms;
            font-size: ${SCALES.font(1, 'inherit')};
            width: ${SCALES.width(1, 'fit-content')};
            height: ${SCALES.height(1, 'auto')};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
          }

          .block {
            padding: ${SCALES.pt(0.125)} ${SCALES.pr(0.25)} ${SCALES.pb(0.125)}
              ${SCALES.pl(0.25)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(-0.125)} ${SCALES.mb(0)}
              ${SCALES.ml(-0.125)};
          }

          .link:hover,
          .link:active,
          .link:focus {
            text-decoration: ${decoration};
          }

          .link:hover {
            background-color: ${useNext
              ? addColorAlpha(theme.palette.link, 0.1)
              : 'unset'};
            color: ${hoverColor};
          }
        `}</style>
      </Component>
    );
  }
);

Link.displayName = 'Link';

export default withScale(Link);
