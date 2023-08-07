import { HTMLAttributes, useMemo } from 'react';
import { KirinThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { useProportions } from '../utils/calculations';

interface Props {
  value?: number;
  limit?: number;
  color?: string;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type CapacityProps = Props & NativeAttrs;

function getColor(val: number, palette: KirinThemesPalette) {
  if (val < 33) return palette.cyan;
  if (val < 66) return palette.warning;

  return palette.errorDark;
}

function Capacity({
  value = 0,
  limit = 100,
  color: userColor = '',
  className = '',
  ...props
}: CapacityProps) {
  const theme = useTheme();
  const { SCALES } = useScale();
  const percentValue = useProportions(value, limit);
  const classes = useClasses('capacity', className);

  const color = useMemo(() => {
    if (userColor && userColor !== '') return userColor;
    return getColor(percentValue, theme.palette);
  }, [userColor, percentValue, theme.palette]);

  return (
    <div className={classes} title={`${percentValue}%`} {...props}>
      <span />

      <style jsx>{`
        .capacity {
          width: ${SCALES.width(3.125)};
          height: ${SCALES.height(0.625)};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          background-color: ${theme.palette.accents_2};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        span {
          width: ${percentValue}%;
          background-color: ${color};
          height: 100%;
          margin: 0;
          padding: 0;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default withScale(Capacity);
