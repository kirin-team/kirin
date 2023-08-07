import { HTMLAttributes } from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<HTMLHeadingElement>, keyof Props>;
export type ModalSubtitleProps = Props & NativeAttrs;

function ModalSubtitle({
  className = '',
  children,
  ...props
}: ModalSubtitleProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  return (
    <>
      <p className={className} {...props}>
        {children}
      </p>

      <style jsx>{`
        p {
          font-weight: normal;
          display: inline-block;
          text-align: center;
          word-break: break-word;
          text-transform: uppercase;
          color: ${theme.palette.accents_5};
          font-size: ${SCALES.font(0.875)};
          line-height: 1.5em;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, '1.5em')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </>
  );
}

export default withScale(ModalSubtitle);
