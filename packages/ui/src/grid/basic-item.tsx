import { HTMLAttributes, useMemo } from 'react';
import useClasses from '../use-classes';
import useScale from '../use-scale';
import useTheme from '../use-theme';
import {
  GridAlignContent,
  GridAlignItems,
  GridDirection,
  GridJustify,
} from './grid-types';

export type GridBreakpointsValue = number | boolean;
export interface GridBasicComponentProps {
  xs?: GridBreakpointsValue;
  sm?: GridBreakpointsValue;
  md?: GridBreakpointsValue;
  lg?: GridBreakpointsValue;
  xl?: GridBreakpointsValue;
  justify?: GridJustify;
  direction?: GridDirection;
  alignItems?: GridAlignItems;
  alignContent?: GridAlignContent;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof GridBasicComponentProps>;
export type GridBasicItemProps = GridBasicComponentProps & NativeAttrs;

type ItemLayoutValue = {
  grow: number;
  width: string;
  basis: string;
  display: string;
};

function getItemLayout(val: GridBreakpointsValue): ItemLayoutValue {
  const display = val === 0 ? 'display: none;' : 'display: inherit;';

  if (typeof val === 'number') {
    const width = (100 / 24) * val;
    const ratio = width > 100 ? '100%' : width < 0 ? '0' : `${width}%`;

    return {
      grow: 0,
      display,
      width: ratio,
      basis: ratio,
    };
  }

  return {
    grow: 1,
    display,
    width: '100%',
    basis: '0',
  };
}

export default function GridBasicItem({
  xs = false,
  sm = false,
  md = false,
  lg = false,
  xl = false,
  justify,
  direction,
  alignItems,
  alignContent,
  children,
  className = '',
  ...props
}: GridBasicItemProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const classes = useMemo(() => {
    const aligns: { [key: string]: any } = {
      justify,
      direction,
      alignItems,
      alignContent,
      xs,
      sm,
      md,
      lg,
      xl,
    };

    const classString = Object.keys(aligns).reduce((pre, name) => {
      if (aligns[name] !== undefined && aligns[name] !== false)
        return `${pre} ${name}`;

      return pre;
    }, '');

    return classString.trim();
  }, [justify, direction, alignItems, alignContent, xs, sm, md, lg, xl]);

  const layout = useMemo<{
    [key in ['xs', 'sm', 'md', 'lg', 'xl'][number]]: ItemLayoutValue;
  }>(
    () => ({
      xs: getItemLayout(xs),
      sm: getItemLayout(sm),
      md: getItemLayout(md),
      lg: getItemLayout(lg),
      xl: getItemLayout(xl),
    }),
    [xs, sm, md, lg, xl]
  );

  return (
    <div className={useClasses('item', classes, className)} {...props}>
      {children}

      <style jsx>{`
        .item {
          font-size: ${SCALES.font(1, 'inherit')};
          height: ${SCALES.height(1, 'auto')};
        }

        .justify {
          justify-content: ${justify};
        }

        .direction {
          flex-direction: ${direction};
        }

        .alignContent {
          align-content: ${alignContent};
        }

        .alignItems {
          align-items: ${alignItems};
        }

        .xs {
          flex-grow: ${layout.xs.grow};
          max-width: ${layout.xs.width};
          flex-basis: ${layout.xs.basis};
          ${layout.xs.display}
        }

        @media only screen and (min-width: ${theme.breakpoints.sm.min}) {
          .sm {
            flex-grow: ${layout.sm.grow};
            max-width: ${layout.sm.width};
            flex-basis: ${layout.sm.basis};
            ${layout.sm.display}
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.md.min}) {
          .md {
            flex-grow: ${layout.md.grow};
            max-width: ${layout.md.width};
            flex-basis: ${layout.md.basis};
            ${layout.md.display}
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.lg.min}) {
          .lg {
            flex-grow: ${layout.lg.grow};
            max-width: ${layout.lg.width};
            flex-basis: ${layout.lg.basis};
            ${layout.lg.display}
          }
        }

        @media only screen and (min-width: ${theme.breakpoints.xl.min}) {
          .xl {
            flex-grow: ${layout.xl.grow};
            max-width: ${layout.xl.width};
            flex-basis: ${layout.xl.basis};
            ${layout.xl.display}
          }
        }
      `}</style>
    </div>
  );
}
