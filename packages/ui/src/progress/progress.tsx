import { ProgressHTMLAttributes } from 'react';
import { KirinThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { useProportions } from '../utils/calculations';
import { NormalTypes } from '../utils/prop-types';

export type ProgressColors = {
  [key: number]: string;
};
export type ProgressTypes = NormalTypes;

interface Props {
  value?: number;
  max?: number;
  fixedTop?: boolean;
  fixedBottom?: boolean;
  colors?: ProgressColors;
  type?: ProgressTypes;
  className?: string;
}

type NativeAttrs = Omit<ProgressHTMLAttributes<any>, keyof Props>;
export type ProgressProps = Props & NativeAttrs;

function getCurrentColor(
  ratio: number,
  palette: KirinThemesPalette,
  type: ProgressTypes,
  colors: ProgressColors = {}
) {
  const defaultColors: { [key in ProgressTypes]: string } = {
    default: palette.foreground,
    success: palette.success,
    secondary: palette.secondary,
    warning: palette.warning,
    error: palette.error,
  };

  const colorKeys = Object.keys(colors);

  if (!colorKeys.length) return defaultColors[type];

  const customColorKey = colorKeys.find((key) => ratio <= +key);

  if (!customColorKey || Number.isNaN(+customColorKey))
    return defaultColors[type];

  return colors[+customColorKey];
}

function Progress({
  value = 0,
  max = 100,
  className = '',
  type = 'default',
  colors,
  fixedTop = false,
  fixedBottom = false,
  ...props
}: ProgressProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const percentValue = useProportions(value, max);
  const currentColor = getCurrentColor(
    percentValue,
    theme.palette,
    type,
    colors
  );

  const fixed = fixedTop || fixedBottom;
  const classes = useClasses('progress', { fixed }, className);

  return (
    <div className={classes}>
      <div className="inner" title={`${percentValue}%`} />
      <progress className={className} value={value} max={max} {...props} />

      <style jsx>{`
        progress {
          position: fixed;
          top: -1000px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .progress {
          position: relative;
          background-color: ${theme.palette.accents_2};
          border-radius: ${theme.layout.radius};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(0.625)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .fixed {
          position: fixed;
          top: ${fixedTop ? 0 : 'unset'};
          bottom: ${fixedBottom ? 0 : 'unset'};
          left: 0;
          border-radius: 0;
        }

        .fixed > .inner {
          border-radius: 0;
        }

        .inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          bottom: 0;
          transition: all 100ms ease-in;
          border-radius: ${theme.layout.radius};
          background-color: ${currentColor};
          width: ${percentValue}%;
        }
      `}</style>
    </div>
  );
}

export default withScale(Progress);
