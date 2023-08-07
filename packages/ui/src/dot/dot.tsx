import { HTMLAttributes, useMemo } from 'react';
import { KirinThemes } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { NormalTypes } from '../utils/prop-types';

export type DotTypes = NormalTypes;
interface Props {
  type?: DotTypes;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type DotProps = Props & NativeAttrs;

function getColor(type: DotTypes, theme: KirinThemes) {
  const colors: { [key in DotTypes]?: string } = {
    default: theme.palette.accents_2,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  };

  return String(colors[type] || colors.default);
}

function Dot({
  type = 'default',
  children,
  className = '',
  ...props
}: DotProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const color = useMemo(() => getColor(type, theme), [type, theme]);

  return (
    <span className={useClasses('dot', className)} {...props}>
      <span className="icon" />
      <span className="label">{children}</span>

      <style jsx>{`
        .dot {
          display: inline-flex;
          align-items: center;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .icon {
          width: 0.625em;
          height: 0.625em;
          min-width: calc(0.625 * 12px);
          min-height: calc(0.625 * 12px);
          line-height: 0.625em;
          border-radius: 50%;
          background-color: ${color};
          user-select: none;
        }

        .label {
          margin-left: 0.5em;
          font-size: 1em;
          line-height: 1em;
          text-transform: capitalize;
        }
      `}</style>
    </span>
  );
}

export default withScale(Dot);
