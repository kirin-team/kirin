import { HTMLAttributes, useMemo } from 'react';
import { KirinThemes } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { NormalTypes } from '../utils/prop-types';

export type NoteTypes = NormalTypes;
interface Props {
  type?: NoteTypes;
  label?: string | boolean;
  filled?: boolean;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type NoteProps = Props & NativeAttrs;

function getStatusColor(type: NoteTypes, filled: boolean, theme: KirinThemes) {
  const colors: { [key in NoteTypes]?: string } = {
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
  };

  const statusColor = colors[type];

  if (!filled)
    return {
      color: statusColor || theme.palette.foreground,
      borderColor: statusColor || theme.palette.border,
      bgColor: theme.palette.background,
    };

  const filledColor = statusColor ? 'white' : theme.palette.background;

  return {
    color: filledColor,
    borderColor: statusColor || theme.palette.foreground,
    bgColor: statusColor || theme.palette.foreground,
  };
}

function Note({
  children,
  type = 'default',
  label = 'Note',
  filled = false,
  className = '',
  ...props
}: NoteProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const { color, borderColor, bgColor } = useMemo(
    () => getStatusColor(type, filled, theme),
    [type, filled, theme]
  );

  return (
    <div className={useClasses('note', className)} {...props}>
      {label && (
        <span className="label">
          <b>{label}:</b>
        </span>
      )}

      {children}

      <style jsx>{`
        .note {
          line-height: 1.8;
          border: 1px solid ${borderColor};
          color: ${color};
          background-color: ${bgColor};
          border-radius: ${theme.layout.radius};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.667)} ${SCALES.pr(1.32)} ${SCALES.pb(0.667)}
            ${SCALES.pl(1.32)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .note :global(p) {
          margin: 0;
        }

        .label {
          text-transform: uppercase;
          user-select: none;
          line-height: 1.5;
          padding-right: 0.38em;
        }
      `}</style>
    </div>
  );
}

export default withScale(Note);