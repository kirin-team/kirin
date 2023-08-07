import { HTMLAttributes } from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type RadioDescriptionProps = Props & NativeAttrs;

function RadioDescription({
  className = '',
  children,
  ...props
}: RadioDescriptionProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <span className={className} {...props}>
      {children}

      <style jsx>{`
        span {
          color: ${theme.palette.accents_3};
          font-size: ${SCALES.font(0.85, 'calc(var(--radio-size) * 0.85)')};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(
              0,
              'calc(var(--radio-size) + var(--radio-size) * 0.375)'
            )};
        }
      `}</style>
    </span>
  );
}

export default withScale(RadioDescription);